import {Component, Input} from '@angular/core';
import {UserService} from "../../../Services/user.service";
import {UserInfoData} from "../../../Interfaces/user-info-data";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {ConnectionService} from "../../../Services/connection.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-modif-user-profile',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './modif-user-profile.component.html',
  styleUrl: './modif-user-profile.component.scss'
})
export class ModifUserProfileComponent {
  @Input() userId!: number;
  protected user !: UserInfoData;
  protected searchUserId!: number;

  constructor(private userService : UserService, private connectionService: ConnectionService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    if (this.connectionService.isLogged()) {
      let tokenInfo = this.connectionService.getTokenInfo();
      if (tokenInfo != null) {
        this.userId = Number(tokenInfo.id);
      }
      this.userService.userInfo(this.userId).subscribe(response => {
        this.user = response;
        console.log(this.user);
      });
    }
  }

    formUserProfile = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
}
