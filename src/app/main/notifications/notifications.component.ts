import {Component, OnInit} from '@angular/core';
import {PaperListComponent} from "../widgets/paper-list/paper-list.component";
import {ConnectionService} from "../../Services/connection.service";
import {FilteredPaperMetaData} from "../../Interfaces/filtered-paper-meta-data";
import {BannerService} from "../../Services/banner.service";
import {BannerType} from "../../Constantes/banner-type";
import {Router} from "@angular/router";
import {NotificationService} from "../../Services/notification.service";
import {NotificationResponse} from "../../Interfaces/notification-response";
import {HttpErrorResponse} from "@angular/common/http";
import {PaperQueryService} from "../../Services/paper-query.service";
import {LoadingComponent} from "../widgets/loading/loading.component";

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    PaperListComponent,
    LoadingComponent
  ],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent implements OnInit{

  constructor(private connectionService : ConnectionService,
              private bannerService : BannerService,
              private notificationService : NotificationService,
              private paperQueryService: PaperQueryService,
              private router: Router) {
  }

  paperMetaData?: FilteredPaperMetaData[];

  ngOnInit(){
    if (!this.connectionService.isLogged()){
      this.bannerService.showPersistentBanner('Connectez-vous pour consulter vos notifications', BannerType.INFO)
      this.router.navigate(["/connection"])
    }
    this.notificationService.getPapers(this.connectionService.getTokenInfo().id).subscribe({
      next: (value: NotificationResponse[]) => {
        this.paperMetaData = [];
        for (let notification of value){
          this.paperQueryService.queryPaperMetaData(notification.paperId).subscribe({
            next: value1 => {
              this.paperMetaData!.push({paperId: notification.paperId, queriedPaperInfosDTO: value1});
            },
            error: ()=>  {}
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404){
          this.paperMetaData = [];
        } else {
          this.bannerService
            .showBanner('Erreur lors de la récupération de vos notifications, réessayez plus tard', BannerType.ERROR)
        }
      }
    });

  }

}
