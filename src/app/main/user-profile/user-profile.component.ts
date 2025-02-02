import { Component } from '@angular/core';
import {ConnectionService} from "../../Services/connection.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../Services/user.service";
import {UserPaperLinksComponent} from "../widgets/user-info/user-paper-links/user-paper-links.component";
import {ButtonComponent} from "../widgets/buttons/button/button.component";
import {ShowUserProfileComponent} from "./show-user-profile/show-user-profile.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    ShowUserProfileComponent,
    UserPaperLinksComponent,
    ButtonComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  protected name!: string;
  protected firstName!: string;
  protected uuid!: string;
  protected id !: number;
  protected searchUserId!: number;

  constructor(private connectionService: ConnectionService,
              private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      let id = params.get('userId');
      this.searchUserId = Number(params.get('userId'));
    });
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
    if(this.searchUserId != 0) {
      this.userService.userInfo(this.searchUserId).subscribe(response => {
        this.searchUserId = response.id;
      });
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
    this.router.navigate(['/']);
  }


}
