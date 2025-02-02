import {Component, Input} from '@angular/core';
import {FilteredPaperMetaData} from "../../../Interfaces/filtered-paper-meta-data";
import {PaperInfoComponent} from "../paper-info/paper-info.component";

@Component({
  selector: 'app-paper-list',
  standalone: true,
  imports: [
    PaperInfoComponent
  ],
  templateUrl: './paper-list.component.html',
  styleUrl: './paper-list.component.scss'
})
export class PaperListComponent {

  @Input() papersMetaData: FilteredPaperMetaData[] = [];
}
