import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from "../widgets/buttons/button/button.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
