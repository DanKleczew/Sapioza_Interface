import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PaperQueryService} from "../../Services/paper-query.service";
import {FieldsEnum} from "../../Constantes/Fields";
import {PaperOutputService} from "../../Services/paper-output.service";
import {PaperMetaData} from "../../Interfaces/paper-meta-data";
import {ConnectionService} from "../../Services/connection.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PaperCreation} from "../../Interfaces/paper-creation";
import {BannerService} from "../../Services/banner.service";
import {BannerType} from "../../Constantes/banner-type";
import {HttpErrorResponse} from "@angular/common/http";
import {PaperFieldPipe} from "../../Pipe/paper-field.pipe";

@Component({
  selector: 'app-paper-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    PaperFieldPipe
  ],
  templateUrl: './paper-editor.component.html',
  styleUrl: './paper-editor.component.scss'
})
export class PaperEditorComponent implements OnInit{
  protected paperId: number|null = null;
  private isUpdating!: boolean;
  private paperMetaData?: PaperMetaData;

  protected fields : string[] = FieldsEnum;

  formEditor = new FormGroup({
    title:      new FormControl('', Validators.required),
    field:      new FormControl('', Validators.required),
    revue:      new FormControl('', Validators.required),
    DOI:        new FormControl('', Validators.required),
    keywords:   new FormControl('', Validators.required),
    abstract_:  new FormControl('', Validators.required),
    body:       new FormControl('', Validators.required)
  })

  constructor(private route: ActivatedRoute,
              private router: Router,
              private paperQueryService: PaperQueryService,
              private paperOutputService: PaperOutputService,
              protected connectionService: ConnectionService,
              private bannerService: BannerService) {
  }

  ngOnInit(){
    if (!this.connectionService.isLogged()) {
      this.bannerService.showBanner('Vous devez être connecté pour utiliser ce service', BannerType.INFO);
    }

    let param = this.route.snapshot.paramMap.get('paperId');
    if (param === null){
      this.isUpdating = false;
      return;
    }

    this.paperId = Number(param);
    if (isNaN(this.paperId)){
      this.bannerService.showPersistentBanner('Identifiant de papier invalide', BannerType.WARNING);
      this.router.navigate(['/']);
      return;
    }

    this.paperQueryService.queryPaperMetaData(this.paperId)
      .subscribe({
        next: response => {
          this.paperMetaData = response;
          this.checkAllowedToModify();
          this.fillForm();
          },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.bannerService.showPersistentBanner('Ce papier n\'existe pas', BannerType.WARNING);
            this.router.navigate(['/']);
          } else {
            this.bannerService.showPersistentBanner('Une erreur est survenue', BannerType.ERROR);
            this.router.navigate(['/']);
          }
        }
      });
      this.isUpdating = true
  }

  private checkAllowedToModify(){
    if (!this.connectionService.isLogged()){
      this.bannerService.showPersistentBanner('Connectez-vous pour modifier ce papier', BannerType.INFO);
      this.router.navigate(['/connection/']);
      return;
    }
    if (this.connectionService.getTokenInfo()?.id !== this.paperMetaData?.userInfoDTO.id){
      this.bannerService.showPersistentBanner('Vous n\'êtes pas autorisé à modifier ce papier', BannerType.WARNING);
      this.router.navigate(['/']);
      return;
    }
  }

  private fillForm(){
    if (!this.paperMetaData){
      return;
    }
    this.formEditor.get('title')!.setValue(this.paperMetaData.paperDTO.title);
    this.formEditor.get('title')?.disable({onlySelf: true, emitEvent: false});
    this.formEditor.get('field')!.setValue(this.paperMetaData.paperDTO.field);
    this.formEditor.get('field')?.disable({onlySelf: true, emitEvent: false});
    this.formEditor.get('revue')!.setValue(this.paperMetaData.paperDTO.publishedIn);
    this.formEditor.get('revue')?.disable({onlySelf: true, emitEvent: false});
    this.formEditor.get('DOI')!.setValue(this.paperMetaData.paperDTO.DOI);
    this.formEditor.get('DOI')?.disable({onlySelf: true, emitEvent: false});
    this.formEditor.get('keywords')!.setValue(this.paperMetaData.paperDTO.keywords);
    this.formEditor.get('keywords')?.disable({onlySelf: true, emitEvent: false});
    this.formEditor.get('abstract_')!.setValue(this.paperMetaData.paperDTO.abstract_);
    this.formEditor.get('abstract_')?.disable({onlySelf: true, emitEvent: false});
  }

  submit(){
    if (!this.connectionService.isLogged()){
      this.bannerService.showBanner('Vous devez être connecté pour effectuer cette action', BannerType.INFO);
      return;
    }
    if (this.formEditor.invalid){
      // Not possible : Submit button disabled if form is invalid
      this.bannerService.showBanner('Veuillez remplir tous les champs', BannerType.WARNING);
      return;
    }
    if (this.isUpdating){
      this.paperOutputService.modifyPaper(
        this.paperId!,
        this.formEditor.get('body')!.value as string,
        this.connectionService.getTokenInfo()!.id
      ).subscribe({
        next: () => {
          this.bannerService.showPersistentBanner('Votre papier a bien été modifié', BannerType.SUCCESS);
          this.router.navigate(['/article/' + this.paperId]);
        },
        error: () => this.bannerService
          .showBanner('Une erreur est survenue pendant la modification. Réessayez plus tard', BannerType.ERROR)
      });
    }

    if (!this.isUpdating){
      const paperCreationDto: PaperCreation = {
        metaData : {
          title : this.formEditor.get('title')!.value as string,
          authorId : this.connectionService.getTokenInfo()!.id,
          field: this.formEditor.get('field')!.value as string,
          publishedIn: this.formEditor.get('revue')!.value as string,
          keywords : this.formEditor.get('keywords')!.value as string,
          abstract_ : this.formEditor.get('abstract_')!.value as string,
          DOI : this.formEditor.get('DOI')!.value as string,
          },
        body : this.formEditor.get('body')!.value as string
        };

        this.paperOutputService.postNewPaper(paperCreationDto)
          .subscribe({
            next: response => {
              this.bannerService.showPersistentBanner('Votre papier a bien été soumis', BannerType.SUCCESS);
              this.router.navigate(['/article/' + response.PaperId]);
            },
            error: () => {
              this.bannerService
              .showBanner('Une erreur est survenue pendant la soumission. Réessayez plus tard', BannerType.ERROR);
            }
          });
    }
  }
}
