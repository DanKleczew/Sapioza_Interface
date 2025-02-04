import {Component, OnInit} from '@angular/core';
import {ConnectionService} from "../../Services/connection.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../Services/user.service";
import {ButtonComponent} from "../widgets/buttons/button/button.component";
import {ShowUserProfileComponent} from "./show-user-profile/show-user-profile.component";
import {BannerService} from "../../Services/banner.service";
import {BannerType} from "../../Constantes/banner-type";
import {HttpErrorResponse} from "@angular/common/http";
import {SubscribeResponse} from "../../Interfaces/subscribe-response";
import {LoadingComponent} from "../widgets/loading/loading.component";
import {RichButtonComponent} from "../widgets/buttons/rich-button/rich-button.component";
import {FilteredPaperMetaData} from "../../Interfaces/filtered-paper-meta-data";
import {PaperQueryService} from "../../Services/paper-query.service";
import {PaperListComponent} from "../widgets/paper-list/paper-list.component";

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    ShowUserProfileComponent,
    ButtonComponent,
    LoadingComponent,
    RichButtonComponent,
    PaperListComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{

  protected loggedOnUserId?: number;
  protected searchUserId!: number;
  protected followers?: number[];
  protected publishedPapers: FilteredPaperMetaData[] = [];

  constructor(protected connectionService: ConnectionService,
              private route: ActivatedRoute,
              private userService: UserService,
              private paperQueryService: PaperQueryService,
              private router: Router,
              private bannerService: BannerService) {
  }

  ngOnInit() {
    this.searchUserId = Number(this.route.snapshot.params['userId']);
    if (isNaN(this.searchUserId)) {
      this.bannerService.showPersistentBanner("L'identifiant d'utilisateur est invalide", BannerType.WARNING);
      this.router.navigate(['/']);
      return;
    }
    if (this.connectionService.isLogged()){
      this.loggedOnUserId = this.connectionService.getTokenInfo().id;
    }

    this.getUserInfos();
  }

  private getUserInfos(): void {
      this.userService.userInfo(this.searchUserId).subscribe({
      next: () => {
        this.getFollowers();
        this.paperQueryService.queryByAuthor(this.searchUserId , 9).subscribe(response => {
          this.publishedPapers = response;
        });
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.bannerService.showPersistentBanner("L'utilisateur n'existe pas", BannerType.INFO);
          this.router.navigate(['/']);
          return;
        } else {
          this.bannerService.showBanner("Impossible de récupérer les informations de l'utilisateur", BannerType.ERROR);
        }
      }
    });
  }

  private getFollowers(): void {
    this.userService.getFollowers(this.searchUserId).subscribe({
      next: (data: number[]) => {
        this.followers = data;
      },
      error: () => {
        this.bannerService.showBanner("Impossible de récupérer les informations de l'utilisateur", BannerType.ERROR);
        return;
      }
    });
  }

  protected deleteCookie(): void{
    this.connectionService.logout();
    this.bannerService.showPersistentBanner("Vous êtes déconnecté(e)", BannerType.INFO);
    this.router.navigate(['/']);
  }

  protected followUser(): void {
    if (!this.connectionService.isLogged()){
      this.bannerService.showBanner("Connectez vous pour vous abonner à cet utilisateur", BannerType.WARNING);
    }
    this.userService.followUser(this.loggedOnUserId!, this.searchUserId).subscribe({
      next: (response: SubscribeResponse) => {
        this.bannerService
          .showPersistentBannerWithLife("Vous êtes désormais abonné aux publications de : " + response.firstName + " " + response.name,
            BannerType.SUCCESS, 3);
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/profile/' + this.searchUserId]);
        });
        },
      error: () => {
        this.bannerService.showBanner("An error occurred while following this user", BannerType.ERROR);
      }
    });
  }
}
