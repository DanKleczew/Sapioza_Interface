import {Component, Input, OnInit} from '@angular/core';
import { PaperQueryService } from '../../../Services/paper-query.service';
import {Router} from "@angular/router";
import {FilteredPaperMetaData} from "../../../Interfaces/filtered-paper-meta-data";
import {PaperMetaData} from "../../../Interfaces/paper-meta-data";

@Component({
  selector: 'app-paper-info',
  standalone: true,
  templateUrl: './paper-info.component.html',
  styleUrl: './paper-info.component.scss'
})
export class PaperInfoComponent implements OnInit {
  // Ce composant peut être appelé avec un ID de papier (Il fait alors une requête de ses informations)
  // ou directement avec les informations du papier.
  // Si les deux sont spécifiées, les informations du papier sont prioritaires.
  @Input() paperId?: number;
  @Input() queriedPaper?: FilteredPaperMetaData;

  title!: String;
  authorName!: String;
  authorId!: number;
  field!: String;
  date!: String;

  constructor(private paperQueryService : PaperQueryService, protected router : Router){
  }

  ngOnInit(){
    if (this.queriedPaper) {
      this.title = this.queriedPaper.queriedPaperInfosDTO.paperDTO.title;
      this.authorName = this.queriedPaper.queriedPaperInfosDTO.userInfoDTO.firstName +
        " " + this.queriedPaper.queriedPaperInfosDTO.userInfoDTO.lastName;
      this.authorId = this.queriedPaper.queriedPaperInfosDTO.userInfoDTO.id;
      this.field = this.queriedPaper.queriedPaperInfosDTO.paperDTO.field;
      this.date = this.queriedPaper.queriedPaperInfosDTO.paperDTO.publicationDate;
      this.paperId = this.queriedPaper.paperId; // For the link
    } else if (this.paperId !== undefined) {
      this.paperQueryService.queryPaperMetaData(this.paperId)
        .subscribe({
          next : (response : PaperMetaData) => {
            this.title = response.paperDTO.title;
            this.authorName = response.userInfoDTO.firstName + " " + response.userInfoDTO.lastName;
            this.authorId = response.userInfoDTO.id;
            this.field = response.paperDTO.field;
            this.date = response.paperDTO.publicationDate;
          }, error : () => {
            alert("Il y a eu une erreur lors de la récupération des informations de l'article "
              + this.paperId + ", réessayez plus tard");
            this.title = "Template article";
          }
        });
    } else {
      // Theoretically not possible
      this.title = "Template article";
        console.error("No paperId or queriedPaper provided to PaperInfoComponent");
      }

  }



}
