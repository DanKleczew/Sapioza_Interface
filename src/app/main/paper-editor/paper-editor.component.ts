import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PaperQueryService} from "../../Services/paper-query.service";

@Component({
  selector: 'app-paper-editor',
  standalone: true,
  imports: [],
  templateUrl: './paper-editor.component.html',
  styleUrl: './paper-editor.component.scss'
})
export class PaperEditorComponent {
  paperId: number|null = null;

  constructor(private route: ActivatedRoute, private paperQueryService : PaperQueryService) {
  }

  ngOnInit(){
    let param = this.route.snapshot.paramMap.get('paperId');
    if (param !== null ){
      this.paperId = Number(param);
    }
  }

  submitExamplePaper() {
    this.paperQueryService.postNewPaper();
  }
}
