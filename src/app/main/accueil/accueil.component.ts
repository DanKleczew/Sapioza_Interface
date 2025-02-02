import {Component, OnInit} from '@angular/core';
import {PaperQueryService} from "../../Services/paper-query.service";
import {FilteredPaperMetaData} from "../../Interfaces/filtered-paper-meta-data";
import {PaperListComponent} from "../widgets/paper-list/paper-list.component";
import {LoadingComponent} from "../widgets/loading/loading.component";
import {BannerService} from "../../Services/banner.service";
import {BannerType} from "../../Constantes/banner-type";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    PaperListComponent,
    LoadingComponent
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent implements OnInit {
  constructor(private paperQueryService : PaperQueryService,
              private bannerService: BannerService) {
  }
  protected papers?: FilteredPaperMetaData[];

  ngOnInit(){
    this.paperQueryService.queryRecent(3)
      .subscribe({
        next: value => this.papers = value,
        error: () => {
            this.bannerService.showBanner("Erreur lors de la récupération des articles récents", BannerType.WARNING)
          }
      });
  }
}
