import {Component, OnInit} from '@angular/core';
import {PaperQueryService} from "../../Services/paper-query.service";
import {FiltersComponent} from "./filters/filters.component";
import {Filter} from "../../Interfaces/filter";
import {FilteredPaperMetaData} from "../../Interfaces/filtered-paper-meta-data";
import {PaperListComponent} from "../widgets/paper-list/paper-list.component";
import {LoadingComponent} from "../widgets/loading/loading.component";
import {BannerService} from "../../Services/banner.service";
import {BannerType} from "../../Constantes/banner-type";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FiltersComponent,
    PaperListComponent,
    LoadingComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  constructor(private paperQueryService : PaperQueryService, private bannerService: BannerService) {
  }

  protected papers?: FilteredPaperMetaData[];

  ngOnInit() {
    this.queryRecent();
  }

  private queryRecent(): void {
    this.paperQueryService.queryRecent(9)
      .subscribe({
        next : (query: FilteredPaperMetaData[]) => {
          this.papers = query;
        },
        error : () => {
          this.bannerService
            .showBanner(
              "Il y a eu une erreur lors de la récupération des articles récents, réessayez plus tard",
              BannerType.WARNING
            );
        }
      });
  }

  protected queryPapers(filter: Filter) {
    this.papers = undefined;
    this.paperQueryService.queryByFilter(filter)
      .subscribe({
        next: (papers) => {
          this.papers = papers;
        },
        error: () => {
          this.bannerService
            .showBanner(
              "Il y a eu une erreur lors de la récupération des articles, réessayez plus tard",
              BannerType.ERROR
            );
        }
      });
  }
}
