import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ConnectionService} from "../../Services/connection.service";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {BannerService} from "../../Services/banner.service";
import {BannerType} from "../../Constantes/banner-type";

@Component({
  selector: 'app-user-authentication',
  standalone: true,
  imports: [
    LoginComponent,
    RegisterComponent,
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './user-authentication.component.html',
  styleUrl: './user-authentication.component.scss'
})
export class UserAuthenticationComponent implements OnInit{
  constructor(private connectionService: ConnectionService,
              private router: Router,
              private bannerService: BannerService) {
  }

  ngOnInit() {
    if (this.connectionService.isLogged()) {
      this.bannerService.showPersistentBanner("Vous êtes déjà connecté. Déconnectez vous pour changer de compte.",
        BannerType.INFO);
      this.router.navigate(['/']);
    }
  }
}
