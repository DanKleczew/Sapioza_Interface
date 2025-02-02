import {Component, Input} from '@angular/core';
import {JsonPipe, NgOptimizedImage} from "@angular/common";
import {UserInfoData} from "../../../Interfaces/user-info-data";
import {UserService} from "../../../Services/user.service";
import {IconButtonComponent} from "../../widgets/buttons/icon-button/icon-button.component";

@Component({
  selector: 'app-show-user-profile',
  standalone: true,
  imports: [
    JsonPipe,
    IconButtonComponent,
    NgOptimizedImage
  ],
  templateUrl: './show-user-profile.component.html',
  styleUrl: './show-user-profile.component.scss'
})
export class ShowUserProfileComponent {
  @Input() userId!: number;
  protected user!: UserInfoData;

  constructor(private userService: UserService) {
  }

  ngOnInit(){
    this.userService.userInfo(this.userId).subscribe(response => {
      this.user = response;
    });
  }
}
