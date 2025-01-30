import { Component } from '@angular/core';
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
export class SearchComponent {
  constructor(private paperQueryService : PaperQueryService) {
  }

  papers!: FilteredPaperMetaData[];

  ngOnInit() {
    this.paperQueryService.queryRecent(9).subscribe((query) => {this.papers = query;});
  }

  protected queryPapers($filter: Filter) {
    this.paperQueryService.queryByFilter($filter).subscribe((query) => {this.papers = query;});
  }
}
