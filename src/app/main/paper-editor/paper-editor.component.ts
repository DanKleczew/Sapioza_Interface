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
              private paperQueryService: PaperQueryService,
              private paperOutputService: PaperOutputService,
              private connectionService: ConnectionService) {
  }


  ngOnInit(){
    let param = this.route.snapshot.paramMap.get('paperId');
    if (param !== null){
      this.paperId = Number(param);
      this.paperQueryService.queryPaperMetaData(this.paperId)
        .subscribe(response => this.paperMetaData = response)
      if (!this.paperMetaData) {
        alert('Oops, ce papier n\'existe pas');
        // TODO : Redirect
      }
      if (!this.connectionService.isLogged() ||
        this.connectionService.getTokenInfo()?.id !== this.paperMetaData?.userInfoDTO.id){
        alert('Identifiez-vous correctement pour modifier ce papier')
      }
      this.isUpdating = true
    }
    else {
      this.isUpdating = false;
    }
  }

  submit(){
    if (!this.connectionService.isLogged()){
      console.log("T'es pas coo ducon");
    }
    if (this.isUpdating){
      console.log("IsUpdating");
    } else {
      if (this.formEditor.invalid){
        alert('Oups il y a eu une erreur')
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
        this.paperOutputService.postNewPaper(paperCreationDto);
        // TODO : Redirect / Success Message
      }



    }
  }
}
