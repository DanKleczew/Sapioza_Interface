import {Component, Input, OnInit} from '@angular/core';
import {UserInfoData} from "../../../Interfaces/user-info-data";
import {UserService} from "../../../Services/user.service";
import {LoadingComponent} from "../../widgets/loading/loading.component";
import {BannerType} from "../../../Constantes/banner-type";
import {BannerService} from "../../../Services/banner.service";

@Component({
  selector: 'app-show-user-profile',
  standalone: true,
  imports: [
    LoadingComponent
  ],
  templateUrl: './show-user-profile.component.html',
  styleUrl: './show-user-profile.component.scss'
})
/**
 * Do not use this component without a working userId
 */
export class ShowUserProfileComponent implements OnInit{
  @Input() userId!: number;
  protected user!: UserInfoData;

  constructor(private userService: UserService, private bannerService: BannerService) {
  }

  ngOnInit(){
    this.userService.userInfo(this.userId).subscribe({ next : response => {
      this.user = response;},
        error: error => {
            this.bannerService
              .showBanner('Une erreur est survenue lors de la récupération des informations de l\'utilisateur', BannerType.ERROR);
        }
    });
  }
}
