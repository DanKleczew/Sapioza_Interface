import {Component, Input, OnInit} from '@angular/core';
import { PaperQueryService } from '../../../Services/paper-query.service';
import {Router} from "@angular/router";
import {FilteredPaperMetaData} from "../../../Interfaces/filtered-paper-meta-data";
import {PaperMetaData} from "../../../Interfaces/paper-meta-data";
import {PaperFieldPipe} from "../../../Pipe/paper-field.pipe";

@Component({
  selector: 'app-paper-info',
  standalone: true,
  templateUrl: './paper-info.component.html',
  imports: [
    PaperFieldPipe
  ],
  styleUrl: './paper-info.component.scss'
})
export class PaperInfoComponent implements OnInit {
  // Ce composant peut être appelé avec un ID de papier (Il fait alors une requête de ses informations)
  // ou directement avec les informations du papier.
  // Si les deux sont spécifiées, les informations du papier sont prioritaires.
  @Input() paperId?: number;
  @Input() queriedPaper?: FilteredPaperMetaData;

  protected paperInfos!: PaperMetaData;

  constructor(private paperQueryService : PaperQueryService,
              protected router : Router){
  }

  ngOnInit(){
    if (this.queriedPaper) {
      this.paperInfos = this.queriedPaper.queriedPaperInfosDTO;
      this.paperId = this.queriedPaper.paperId; // For the link
    } else if (this.paperId !== undefined) {
      this.paperQueryService.queryPaperMetaData(this.paperId)
        .subscribe({
          next : (paperMetaData : PaperMetaData) => {
            this.paperInfos = paperMetaData;
          },
          error : () => {
            alert("Il y a eu une erreur lors de la récupération des informations de l'article "
              + this.paperId + ", réessayez plus tard");
            this.paperInfos.paperDTO.title = "Template article";
          }
        });
    } else {
      // Theoretically not possible
      this.paperInfos.paperDTO.title = "Template article";
        console.error("No paperId or queriedPaper provided to PaperInfoComponent");
      }
  }
}
