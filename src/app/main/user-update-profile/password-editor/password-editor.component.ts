import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../Services/user.service";
import {ConnectionService} from "../../../Services/connection.service";
import {PasswordUpdateData} from "../../../Interfaces/updateUser/password-update-data";
import {BannerService} from "../../../Services/banner.service";
import {BannerType} from "../../../Constantes/banner-type";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-password-editor',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './password-editor.component.html',
  styleUrl: '../../common-stylesheets/form-components.scss'
})
export class PasswordEditorComponent {

  @Input()
  userId!: number;

  constructor(private userService: UserService,
              private connectionService: ConnectionService,
              private bannerService: BannerService,
              private router: Router) {
  }

  protected formChangePassword: FormGroup = new FormGroup({
    password: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmNewPassword: new FormControl('', [Validators.required]),
  });

  protected onSubmit(): void {
    if (this.formChangePassword.invalid){
      this.bannerService.showBanner('Veuillez remplir correctement les champs du formulaire', BannerType.WARNING);
      return;
    }
    if (this.formChangePassword.get('newPassword')!.value !== this.formChangePassword.get('confirmNewPassword')!.value) {
      this.bannerService.showBanner("Les mots de passe ne correspondent pas, veuillez réessayer", BannerType.WARNING);
      return;
    }
    const passwordUpdateData: PasswordUpdateData = {
      id: Number(this.connectionService.getTokenInfo().id),
      password: this.formChangePassword.value.password,
      newPassword: this.formChangePassword.value.newPassword,
    }
    this.doUpdate(passwordUpdateData);
  }

  private doUpdate(passwordUpdateData : PasswordUpdateData): void {
    this.userService.changePassword(passwordUpdateData).subscribe({
      next: () => {
        this.bannerService.showPersistentBanner("Votre mot de passe a été modifié avec succès", BannerType.SUCCESS);
        this.router.navigate(['/user/profile/' + this.connectionService.getTokenInfo().id]);
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 403){
          this.bannerService.showBanner("Mauvais mot de passe, veuillez réessayer", BannerType.WARNING);
          return;
        }
        this.bannerService.showBanner("Une erreur est survenue pendant la modification de votre mot de passe",
          BannerType.ERROR);
      }
    });
  }
}
