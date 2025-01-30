import {Component, Input} from '@angular/core';
import {PaperInfoComponent} from "../../widgets/paper-info/paper-info.component";
import {FilteredPaperMetaData} from "../../../Interfaces/filtered-paper-meta-data";

@Component({
  selector: 'app-query-results',
  standalone: true,
  imports: [
    PaperInfoComponent
  ],
  templateUrl: './query-results.component.html',
  styleUrl: './query-results.component.scss'
})
export class QueryResultsComponent {
  @Input() papers !: FilteredPaperMetaData[];
}
