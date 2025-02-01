import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../../Services/user.service";
import {ConnectionService} from "../../../../Services/connection.service";
import {PasswordUpdateData} from "../../../../Interfaces/updateUser/password-update-data";
import {PaperInfoComponent} from "../../../widgets/paper-info/paper-info.component";
import {UserPaperLinksComponent} from "../../../widgets/user-info/user-paper-links/user-paper-links.component";

@Component({
  selector: 'app-password-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './password-editor.component.html',
  styleUrl: './password-editor.component.scss'
})
export class PasswordEditorComponent implements OnInit{
  constructor(private userService: UserService,
              private connectionService: ConnectionService,
              private cdr: ChangeDetectorRef) {
  }

  protected formChangePassword!: FormGroup;

  ngOnInit() {
    this.initializeForm();
    this.userService.userInfo(this.connectionService.getTokenInfo().id).subscribe(user => {
      this.formChangePassword.patchValue({
        email: user.email,
      });
    });
  }

  initializeForm() {
    this.formChangePassword = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmNewPassword: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.formChangePassword.value.newPassword !== this.formChangePassword.value.confirmNewPassword) {
//      this.passwordDoNotMatch = true;
      return;
    }
    let passwordUpdateData: PasswordUpdateData = {
      id: Number(this.connectionService.getTokenInfo().id),
      password: this.formChangePassword.value.password,
      newPassword: this.formChangePassword.value.newPassword,
    }
    try {
      this.userService.changePassword(passwordUpdateData);
    }
    catch (e) {
      console.error("Error in password-editor.component.ts: " + e);
    }

  }
}
