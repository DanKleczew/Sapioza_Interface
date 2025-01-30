import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PaperQueryService} from "../../Services/paper-query.service";
import {FieldsEnum} from "../../Constantes/Fields";
import {PaperOutputService} from "../../Services/paper-output.service";
import {PaperMetaData} from "../../Interfaces/paper-meta-data";
import {ConnectionService} from "../../Services/connection.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PaperCreation} from "../../Interfaces/paper-creation";

@Component({
  selector: 'app-paper-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './paper-editor.component.html',
  styleUrl: './paper-editor.component.scss'
})
export class PaperEditorComponent {
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
              private connectionService: ConnectionService) {
  }


  ngOnInit(){
    let param = this.route.snapshot.paramMap.get('paperId');
    if (param !== null){
      this.paperId = Number(param);
      this.paperQueryService.queryPaperMetaData(this.paperId)
        .subscribe(response => {
          this.paperMetaData = response;
          this.checkAllowedToModify();
          this.fillForm();
        }
        );
      this.isUpdating = true
    }
    else {
      this.isUpdating = false;
    }
  }

  private checkAllowedToModify(){
    if (!this.paperMetaData) {
      alert('Oops, ce papier n\'existe pas');
      this.router.navigate(['/']);
    }
    if (!this.connectionService.isLogged() ||
      this.connectionService.getTokenInfo()?.id !== this.paperMetaData?.userInfoDTO.id){
      alert('Identifiez-vous correctement pour modifier ce papier')
      this.router.navigate(['/profile']);
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
      alert('Vous devez être connecté pour effectuer cette action')
      this.router.navigate(['/profile']);
    }
    if (this.formEditor.invalid){
      // Not possible : Submit button disabled if form is invalid
      alert('Oups il y a eu une erreur');
      this.router.navigate(['/']);
    }
    if (this.isUpdating){
      this.paperOutputService.modifyPaper(
        this.paperId!,
        this.formEditor.get('body')!.value as string,
        this.connectionService.getTokenInfo()!.id
      );
      alert('Votre papier a bien été soumis')
      this.router.navigate(['/article/' + this.paperId]);
    } else {
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
        }
        this.paperOutputService.postNewPaper(paperCreationDto)
          .subscribe(response => {
            alert('Votre papier a bien été soumis');
            this.router.navigate(['/article/' + response.PaperId]);
          });
    }
  }
}
