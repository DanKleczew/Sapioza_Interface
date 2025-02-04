import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../Services/user.service";
import {RegisterData} from "../../../Interfaces/register-data";
import {BannerService} from "../../../Services/banner.service";
import {BannerType} from "../../../Constantes/banner-type";
import {ConnectionService} from "../../../Services/connection.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['../../common-stylesheets/form-components.scss']
})
export class RegisterComponent {

  constructor(private userService: UserService,
              private bannerService: BannerService,
              private connectionService: ConnectionService) {
  }

  formUserRegister = new FormGroup({
    firstNameRegister: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastNameRegister: new FormControl('', [Validators.required, Validators.minLength(2)]),
    emailRegister: new FormControl('', [ Validators.required, Validators.email]),
    passwordRegister: new FormControl('', [Validators.required, Validators.minLength(4)]),
    confirmPasswordRegister: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  onSubmitRegister(): void {
    if (this.formUserRegister.invalid) {
      this.bannerService.showBanner("Les champs ne sont pas correctement remplis", BannerType.WARNING);
      return;
    }
    if (this.formUserRegister.get('passwordRegister')!.value !==
      this.formUserRegister.get('confirmPasswordRegister')!.value) {
      this.bannerService.showBanner("Les mots de passe ne correspondent pas", BannerType.WARNING);
      return;
    }

    const registerData : RegisterData = {
      firstName: this.formUserRegister.get("firstNameRegister")!.value,
      name: this.formUserRegister.get("lastNameRegister")!.value,
      email: this.formUserRegister.get("emailRegister")!.value,
      password: this.formUserRegister.get("passwordRegister")!.value,
    } as RegisterData;
    this.userService.createAccount(registerData).subscribe({
      next: () => {
        this.bannerService.showPersistentBanner("Compte créé avec succès", BannerType.SUCCESS);
        this.connectionService.login(registerData.email, registerData.password);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 409) {
          this.bannerService.showBanner("Adresse email déjà utilisée", BannerType.WARNING);
          return;
        }
        this.bannerService
          .showBanner("Erreur lors de la création du compte, veuillez réessayer plus tard", BannerType.ERROR)
      }
    }
    );
  }
}
