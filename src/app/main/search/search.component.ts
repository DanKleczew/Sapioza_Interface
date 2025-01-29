import { Component } from '@angular/core';
import {PaperQueryService} from "../../Services/paper-query.service";
import { PaperMetaData } from '../../Interfaces/paper-meta-data';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  constructor(private paperQueryService : PaperQueryService) {
  }

  papers!: PaperMetaData[];

  ngOnInit() {
    this.paperQueryService.queryRecent().subscribe((query) => {this.papers = query;});
  }

  showPapers(){
    console.log(this.papers);
  }
}
