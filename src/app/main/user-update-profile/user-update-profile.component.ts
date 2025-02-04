import {Component, OnInit} from '@angular/core';
import {ConnectionService} from "../../Services/connection.service";
import {NameEditorComponent} from "./name-editor/name-editor.component";
import {PasswordEditorComponent} from "./password-editor/password-editor.component";
import {UserDeleteComponent} from "./user-delete/user-delete.component";
import {BannerService} from "../../Services/banner.service";
import {BannerType} from "../../Constantes/banner-type";
import {ActivatedRoute, Router} from "@angular/router";
import {LoadingComponent} from "../widgets/loading/loading.component";

@Component({
  selector: 'app-user-update-profile',
  standalone: true,
  imports: [
    NameEditorComponent,
    PasswordEditorComponent,
    UserDeleteComponent,
    LoadingComponent
  ],
  templateUrl: './user-update-profile.component.html',
  styleUrls: ['../common-stylesheets/dual-form-component.scss'],
})
export class UserUpdateProfileComponent implements OnInit{

  protected userId!: number;
  protected valid: boolean = false;

  constructor(private connectionService: ConnectionService,
              private bannerService: BannerService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.userId = Number(this.route.snapshot.params['userId']);
    this.checkValidityRouteAndUser();
  }

  private checkValidityRouteAndUser(){
    if (isNaN(this.userId)){
      this.bannerService.showPersistentBanner("L'ID d'utilisateur est invalide", BannerType.WARNING)
      this.router.navigate(['/']);
      return;
    }
    if (!this.connectionService.isLogged()){
      this.bannerService.showPersistentBanner("Connectez vous pour accéder à cette page", BannerType.WARNING)
      this.router.navigate(['/connection']);
      return;
    }
    if (this.connectionService.getTokenInfo().id !== this.userId){
      this.bannerService.showPersistentBanner("Vous ne pouvez pas modifier les informations d'un autre utilisateur",
        BannerType.WARNING)
      this.router.navigate(['/']);
      return;
    }
    this.valid = true;
  }

}
