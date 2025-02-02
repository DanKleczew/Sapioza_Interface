import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../Services/user.service";
import {ConnectionService} from "../../../Services/connection.service";
import {PasswordUpdateData} from "../../../Interfaces/updateUser/password-update-data";
import {BannerService} from "../../../Services/banner.service";
import {BannerType} from "../../../Constantes/banner-type";


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
              private bannerService: BannerService) {
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
      this.bannerService.showBanner("The New Password and Confirm Password do not match", BannerType.ERROR);
      return;
    }
    let passwordUpdateData: PasswordUpdateData = {
      id: Number(this.connectionService.getTokenInfo().id),
      password: this.formChangePassword.value.password,
      newPassword: this.formChangePassword.value.newPassword,
    }

    this.userService.changePassword(passwordUpdateData).subscribe({
      next: (data) => {
        this.bannerService.showBanner("your password has been updated", BannerType.SUCCESS);
      },
      error: (error) => {
        if(error.status == 403){
          this.bannerService.showBanner("Your Email and Password do not match", BannerType.ERROR);
          return;
        }
        this.bannerService.showBanner("An error occurred while updating your new password", BannerType.ERROR);
      }
    });
  }
}
