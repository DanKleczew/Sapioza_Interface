import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {PaperQueryService} from "./paper-query.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private queryService: PaperQueryService) { }

  protected queryTest(){
    this.queryService.queryPapers(42);
  }
}
