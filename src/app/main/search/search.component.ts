import { Component } from '@angular/core';
import {PaperQueryService} from "../../Services/paper-query.service";
import {FiltersComponent} from "./filters/filters.component";
import {QueryResultsComponent} from "./query-results/query-results.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FiltersComponent,
    QueryResultsComponent
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

}
