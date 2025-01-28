import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../Services/user.service";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  private userId: number | undefined;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  noOnInit():void {
    console.log("test");
    this.route.params.subscribe(params => {
    this.userId = params['id'];
    console.log(this.userId);
    console.log(this.userService.userInfo(this.userId));
  });}
}
