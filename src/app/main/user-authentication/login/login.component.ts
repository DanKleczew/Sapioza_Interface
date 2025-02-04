import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../../Services/user.service";
import {LoginData} from "../../../Interfaces/login-data";
import {ConnectionService} from "../../../Services/connection.service";
import {TokenData} from "../../../Interfaces/token-data";
import {Router} from "@angular/router";
import {BannerService} from "../../../Services/banner.service";
import {BannerType} from "../../../Constantes/banner-type";
import {UserInfoData} from "../../../Interfaces/user-info-data";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './login.component.html',
  styleUrls: ['../../common-stylesheets/form-components.scss',]
})
export class LoginComponent {

  constructor(private userService: UserService,
              private connectionService: ConnectionService,
              private router: Router,
              private bannerService: BannerService) {
  }


  formLogin = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });


  onSubmitLogin(){
    if (this.formLogin.invalid) {
      this.bannerService.showBanner("Veuillez remplir les champs correctement.", BannerType.WARNING);
      return;
    }
    const formData : LoginData = {
      email : this.formLogin.get('email')!.value,
      password : this.formLogin.get('password')!.value
    } as LoginData;

    this.userService.userLoginLoginData(formData).subscribe({
      next: (response: UserInfoData) => {
        const tokenData: TokenData = {
          name: response.name,
          firstName: response.firstName,
          uuid: response.uuid,
          id: response.id
        }
        this.connectionService.saveToken(tokenData);
        this.router.navigate(['/profile/' + response.id]);
      }, error: (error : HttpErrorResponse)=> {
        // 401 = Do not match; 404 = Email not found
        if (error.status === 401 || error.status === 404) {
          this.bannerService.showBanner("Couple Email / Mot de passe erroné.", BannerType.WARNING);
        } else {
          this.bannerService.showBanner("Une erreur est survenue. Veuillez réessayer plus tard.", BannerType.ERROR);
        }
      }
    });
  }
}
