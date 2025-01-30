import {Component, Input, input} from '@angular/core';
import {PaperQueryService} from "../../../../Services/paper-query.service";
import {Router} from "@angular/router";
import {FilteredPaperMetaData} from "../../../../Interfaces/filtered-paper-meta-data";
import {PaperInfoComponent} from "../../paper-info/paper-info.component";

@Component({
  selector: 'app-user-paper-links',
  standalone: true,
  imports: [
    PaperInfoComponent
  ],
  templateUrl: './user-paper-links.component.html',
  styleUrls: ['./user-paper-links.component.scss']
})
export class UserPaperLinksComponent {

  protected papersList!: FilteredPaperMetaData[];
  @Input() userId!: number;
  constructor(private paperQueryService: PaperQueryService,
              private router: Router) {
  }

  ngOnInit(){
    if (this.userId == 0) {
      return;
    }
    this.paperQueryService.queryByAuthor(this.userId , 10).subscribe(response => {
      this.papersList = response;
    });
  }

  redirectToPaper(paperId: number){
    this.router.navigate(['/article', paperId]);
  }
}
