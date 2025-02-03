import {Component, OnInit} from '@angular/core';
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
export class UserProfileComponent implements OnInit{
  protected name!: string;
  protected firstName!: string;
  protected uuid!: string;
  protected id !: number;
  protected searchUserId!: number;
  protected followers: number[] = [];

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
    this.userService.getFollowers(this.searchUserId).subscribe({
      next: data => {
        this.followers = data;
      },
      error: error => {
        console.error('There was an error!', error);
      }
    })
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
    this.router.navigate(['/']);
  }


  followUser() {
    this.userService.followUser(this.id,this.searchUserId).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.error('There was an error!', error);
      }
    });
  }
}
