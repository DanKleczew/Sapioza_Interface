import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {RichButtonComponent} from "../widgets/buttons/rich-button/rich-button.component";
import {IconButtonComponent} from "../widgets/buttons/icon-button/icon-button.component";
import {ConnectionService} from "../../Services/connection.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RichButtonComponent, IconButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(protected connectionService: ConnectionService) {
  }
}

