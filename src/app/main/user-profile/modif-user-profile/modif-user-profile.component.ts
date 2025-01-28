import {Component, Input} from '@angular/core';
import {UserService} from "../../../Services/user.service";
import {UserInfoData} from "../../../Interfaces/user-info-data";

@Component({
  selector: 'app-modif-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './modif-user-profile.component.html',
  styleUrl: './modif-user-profile.component.scss'
})
export class ModifUserProfileComponent {
  @Input() userId!: number;
  protected user !: UserInfoData;

  constructor(private userService : UserService) {
  }

  ngOnInit() {
    this.userService.userInfo(this.userId).subscribe((response : UserInfoData): undefined => {
      this.user = response;
      console.log(this.user);
    });
  }



}
