import { Component, Input } from '@angular/core';
import { PaperQueryService } from '../../../Services/paper-query.service';

@Component({
  selector: 'app-paper-info',
  standalone: true,
  templateUrl: './paper-info.component.html',
  styleUrl: './paper-info.component.scss'
})
export class PaperInfoComponent {
  @Input() paperId!: number;

  // private title: String;
  // private authorId: number;
  // private field: String;
  // private date: Date;

  constructor(private paperQueryService : PaperQueryService){
  }


}
