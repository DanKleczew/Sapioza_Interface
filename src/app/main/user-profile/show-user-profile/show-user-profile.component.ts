import {Component, Input, OnInit} from '@angular/core';
import {UserInfoData} from "../../../Interfaces/user-info-data";
import {UserService} from "../../../Services/user.service";

@Component({
  selector: 'app-show-user-profile',
  standalone: true,
  imports: [
  ],
  templateUrl: './show-user-profile.component.html',
  styleUrl: './show-user-profile.component.scss'
})
/**
 * Do not use this component without a working userId
 */
export class ShowUserProfileComponent implements OnInit{
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
