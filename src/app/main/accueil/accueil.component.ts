import {Component, OnInit} from '@angular/core';
import {PaperInfoComponent} from "../widgets/paper-info/paper-info.component";
import {PaperQueryService} from "../../Services/paper-query.service";
import {FilteredPaperMetaData} from "../../Interfaces/filtered-paper-meta-data";

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [
    PaperInfoComponent
  ],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.scss'
})
export class AccueilComponent implements OnInit {
  constructor(private paperQueryService : PaperQueryService) {
  }
  protected papers!: FilteredPaperMetaData[];

  ngOnInit(){
    this.paperQueryService.queryRecent(3)
      .subscribe({
        next: value => this.papers = value,
        error: error => this.papers = []
      });
  }
}
