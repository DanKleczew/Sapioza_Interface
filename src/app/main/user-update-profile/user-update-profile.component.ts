import {Component, Input, OnInit} from '@angular/core';
import {ConnectionService} from "../../Services/connection.service";
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
export class UserUpdateProfileComponent implements OnInit{
  constructor(private connectionService: ConnectionService) {
  }
  ngOnInit() {
    this.connectionService.checkAccess();
  }

}
