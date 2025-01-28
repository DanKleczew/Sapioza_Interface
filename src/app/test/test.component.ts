import { Component } from '@angular/core';
import {PaperInfoComponent} from "../main/widgets/paper-info/paper-info.component";
import { PaperQueryService } from '../Services/paper-query.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [PaperInfoComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  constructor(){
  }
}
