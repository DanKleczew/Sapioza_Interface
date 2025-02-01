import {Component, OnInit} from '@angular/core';
import {PaperQueryService} from "../../Services/paper-query.service";
import {FiltersComponent} from "./filters/filters.component";
import {Filter} from "../../Interfaces/filter";
import {QueryResultsComponent} from "./query-results/query-results.component";
import {FilteredPaperMetaData} from "../../Interfaces/filtered-paper-meta-data";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FiltersComponent,
    QueryResultsComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  constructor(private paperQueryService : PaperQueryService) {
  }

  protected papers!: FilteredPaperMetaData[];

  ngOnInit() {
    this.paperQueryService.queryRecent(9)
      .subscribe({
        next : (query) => {
          this.papers = query;
        },
        error : () => {
          alert("Il y a eu une erreur lors de la récupération des derniers articles, réessayez plus tard");
          this.papers = [];
        }
      });
  }

  protected queryPapers(filter: Filter) {
    this.paperQueryService.queryByFilter(filter)
      .subscribe({
        next: (papers) => {
          this.papers = papers;
        },
        error: () => {
          alert("Il y a eu une erreur lors de la récupération des articles, réessayez plus tard");
          this.papers = [];
        }
      });
  }
}
