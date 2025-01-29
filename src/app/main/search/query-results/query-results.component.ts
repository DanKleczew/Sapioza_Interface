import {Component, Input} from '@angular/core';
import {PaperMetaData} from "../../../Interfaces/paper-meta-data";
import {PaperInfoComponent} from "../../widgets/paper-info/paper-info.component";

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
  @Input() papers !: number[];

}
