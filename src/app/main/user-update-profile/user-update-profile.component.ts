import {Component, Input} from '@angular/core';
import {UserInfoData} from "../../Interfaces/user-info-data";
import {UserService} from "../../Services/user.service";
import {ConnectionService} from "../../Services/connection.service";
import {ActivatedRoute} from "@angular/router";
import {NameEditorComponent} from "./name-editor/name-editor.component";
import {PasswordEditorComponent} from "./password-editor/password-editor.component";
import {UserDeleteComponent} from "./user-delete/user-delete.component";

@Component({
  selector: 'app-user-update-profile',
  standalone: true,
  imports: [
    NameEditorComponent,
    PasswordEditorComponent,
    UserDeleteComponent
  ],
  templateUrl: './user-update-profile.component.html',
  styleUrl: './user-update-profile.component.scss'
})
export class UserUpdateProfileComponent {
  @Input() userId!: number;
  protected user !: UserInfoData;
  protected searchUserId!: number;

  constructor(private userService : UserService, private connectionService: ConnectionService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.connectionService.checkAccess();
  }

}
