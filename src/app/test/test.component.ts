import { Component } from '@angular/core';
import {PaperInfoComponent} from "../main/widgets/paper-info/paper-info.component";
import { PaperQueryService } from '../Services/paper-query.service';
import { ButtonComponent } from "../main/widgets/buttons/button/button.component";
import { RichButtonComponent } from "../main/widgets/buttons/rich-button/rich-button.component";
import { IconButtonComponent } from "../main/widgets/buttons/icon-button/icon-button.component";
import {LoadingComponent} from "../main/widgets/loading/loading.component";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [PaperInfoComponent, ButtonComponent, RichButtonComponent, IconButtonComponent, LoadingComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {
  constructor(){
  }
}
