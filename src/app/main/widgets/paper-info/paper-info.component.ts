import { Component, Input } from '@angular/core';
import { PaperQueryService } from '../../../Services/paper-query.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-paper-info',
  standalone: true,
  templateUrl: './paper-info.component.html',
  styleUrl: './paper-info.component.scss'
})
export class PaperInfoComponent {
  @Input() paperId!: number;

  title!: String;
  authorName!: String;
  field!: String;
  date!: String;

  constructor(private paperQueryService : PaperQueryService, protected router : Router){
  }

  ngOnInit(){
    this.paperQueryService.queryPaperMetaData(this.paperId).subscribe((response) =>
      {
        this.title = response.paperDTO.title;
        this.authorName = response.userInfoDTO.firstName + " " + response.userInfoDTO.lastName;
        this.field = response.paperDTO.field;
        this.date = response.paperDTO.publicationDate;
    });
  }



}
