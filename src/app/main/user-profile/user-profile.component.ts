import { Component } from '@angular/core';
import {ModifUserProfileComponent} from "./modif-user-profile/modif-user-profile.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    ModifUserProfileComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  constructor() {
  }

}
