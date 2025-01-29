import { Component } from '@angular/core';
import {PaperQueryService} from "../../Services/paper-query.service";
import {FiltersComponent} from "./filters/filters.component";
import {Filter} from "../../Interfaces/filter";
import {QueryResultsComponent} from "./query-results/query-results.component";

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

  papers!: number[];

  ngOnInit() {
    this.paperQueryService.queryRecent().subscribe((query) => {this.papers = query;});
  }

  protected queryPapers($filter: Filter) {
    this.paperQueryService.queryByFilter($filter).subscribe((query) => {this.papers = query;});
  }
}
