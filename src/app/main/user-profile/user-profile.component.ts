import { Component } from '@angular/core';
import {ModifUserProfileComponent} from "./modif-user-profile/modif-user-profile.component";
import {LoginComponent} from "./login/login.component";
import {CookieService} from "ngx-cookie-service";
import {ConnectionService} from "../../Services/connection.service";
import {RegisterComponent} from "./register/register.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    ModifUserProfileComponent,
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  protected name!: string;
  protected firstName!: string;
  protected uuid!: string;
  protected id !: number;

  constructor(private connectionService: ConnectionService) {
  }

  ngOnInit() {
    if (this.connectionService.isLogged()) {
      let tokenInfo = this.connectionService.getTokenInfo();
      if (tokenInfo != null) {
        this.name = tokenInfo.name;
        this.firstName = tokenInfo.firstName;
        this.uuid = tokenInfo.uuid;
        this.id = tokenInfo.id;
        return;
      }
    }
    this.name = "";
    this.firstName = "";
    this.uuid = "";
    this.id = 0;
    return;
  }

  deleteCookie(){
    this.connectionService.logout();
    let tokenInfo = this.connectionService.getTokenInfo();
    console.log(tokenInfo);
  }


}
