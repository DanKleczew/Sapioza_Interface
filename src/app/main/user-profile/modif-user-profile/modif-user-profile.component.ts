import {Component, Input} from '@angular/core';
import {UserService} from "../../../Services/user.service";
import {UserInfoData} from "../../../Interfaces/user-info-data";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {ConnectionService} from "../../../Services/connection.service";
import {ActivatedRoute} from "@angular/router";
import {NameEditorComponent} from "./name-editor/name-editor.component";
import {PasswordEditorComponent} from "./password-editor/password-editor.component";

@Component({
  selector: 'app-modif-user-profile',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    NameEditorComponent,
    PasswordEditorComponent
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
    this.connectionService.checkAccess();
  }

}
