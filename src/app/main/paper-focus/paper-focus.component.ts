import {Component, OnInit} from '@angular/core';
import {ButtonComponent} from "../widgets/buttons/button/button.component";
import {ActivatedRoute, Router} from "@angular/router";
import {IconButtonComponent} from "../widgets/buttons/icon-button/icon-button.component";
import {ConnectionService} from "../../Services/connection.service";
import {PaperQueryService} from "../../Services/paper-query.service";
import {PaperMetaData} from "../../Interfaces/paper-meta-data";
import {OpinionService} from "../../Services/opinion.service";
import {Opinion} from "../../Interfaces/opinion";
import {PaperOutputService} from "../../Services/paper-output.service";
import {SuppressionObject} from "../../Interfaces/suppression-object";
import {BannerService} from "../../Services/banner.service";
import {BannerType} from "../../Constantes/banner-type";
import {HttpErrorResponse} from "@angular/common/http";
import {LoadingComponent} from "../widgets/loading/loading.component";
import {PaperFieldPipe} from "../../Pipe/paper-field.pipe";
import {IsoToFrenchDatePipe} from "../../Pipe/iso-to-french-date.pipe";

@Component({
  selector: 'app-paper-focus',
  standalone: true,
  imports: [
    ButtonComponent,
    IconButtonComponent,
    LoadingComponent,
    PaperFieldPipe,
    IsoToFrenchDatePipe
  ],
  templateUrl: './paper-focus.component.html',
  styleUrl: './paper-focus.component.scss'
})
export class PaperFocusComponent implements OnInit {

  protected paperId!: number;
  protected paperMetaData?: PaperMetaData;

  protected likes: number = 0;
  protected dislikes: number = 0;
  protected hasLiked: boolean = false;
  protected hasDisliked: boolean = false;
  protected isOwnPaper: boolean = false;

  constructor(private route : ActivatedRoute,
              protected router : Router,
              private paperQueryService: PaperQueryService,
              protected connectionService : ConnectionService,
              private opinionService: OpinionService,
              private paperOutputService: PaperOutputService,
              private bannerService: BannerService) {
  }

  ngOnInit() {
    this.paperId = Number(this.route.snapshot.paramMap.get('paperId'));

    if (isNaN(this.paperId)) {
      this.bannerService.showPersistentBanner("Vous essayez d'accéder à un article qui n'existe pas.", BannerType.WARNING);
      this.router.navigate(['/']);
      return;
    }

    this.paperQueryService.queryPaperMetaData(this.paperId).subscribe({
      next: (paperMetaData: PaperMetaData) => {
        this.paperMetaData = paperMetaData;

        (this.paperMetaData.userInfoDTO.id === this.connectionService.getTokenInfo()?.id)
          ? this.isOwnPaper = true
          : this.isOwnPaper = false;

        this.likes = paperMetaData.paperDTO.likes;
        this.dislikes = paperMetaData.paperDTO.dislikes;

        if (this.connectionService.isLogged()) {
          // User opinion analyse for display and update
          this.opinionService.getOpinion(this.paperId, this.connectionService.getTokenInfo()!.id)
            .subscribe({
              next: (opinion: Opinion) => {
                if (opinion.opinion === 'LIKE') {
                  this.hasLiked = true;
                } else if (opinion.opinion === 'DISLIKE') {
                  this.hasDisliked = true;
                }
              },
              error: () => {}
            });
        }
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.bannerService
            .showPersistentBanner("Vous essayez d'accéder à un article qui n'existe pas.", BannerType.WARNING);
          this.router.navigate(['/']);
          return;
        } else {

        }
        this.bannerService
          .showPersistentBanner("Erreur pendant la récupération des informations de l'article.", BannerType.ERROR);
        this.router.navigate(['/']);
        return;
      }
    })
  }

  protected openArticle(): void {
    window.open('http://51.178.59.232:8082/papers/pdf/' + this.paperId, '_blank');
  }

  protected changeOpinion(likePressed: boolean): void {
    if (!this.connectionService.isLogged()) {
      this.bannerService.showBanner("Vous devez être connecté pour donner votre avis.", BannerType.INFO);
      return;
    }
    // Calcul (et affichage) du changement d'opinion
    this.calculateOpinion(likePressed);
    // Envoi de la nouvelle opinion au serveur
    this.sendNewOpinion();
  }

  protected deletePaper(): void {
    if (!this.isOwnPaper) {
      // Theoretically Impossible since the button is hidden if the user is not the author
      this.bannerService.showBanner("Vous n'êtes pas autorisé à supprimer cet article.", BannerType.ERROR);
      return;
    }
    let supprObj: SuppressionObject = {
      articleId: this.paperId,
      userIdentificationDTO: {
        userId: this.connectionService.getTokenInfo()!.id,
        userUUID: this.connectionService.getTokenInfo()!.uuid,
      }
    }
    this.paperOutputService.deletePaper(supprObj)
      .subscribe({
        next: () => {
          this.bannerService.showPersistentBanner("Article supprimé avec succès", BannerType.SUCCESS);
          this.router.navigate(['/']);},
        error: () => {
          // 404 and 500 errors should be handled the same way in this case
          this.bannerService
            .showBanner("Erreur lors de la suppression de l'article. Veuillez réessayer ultérieurement.",
              BannerType.ERROR);
        }
      });
  }

  protected redirectToReviews(): void {

  }

  private calculateOpinion(likePressed : boolean): void {
    if (this.hasLiked && likePressed) {
      this.likes--;
      this.hasLiked = false;
    }
    else if (!this.hasLiked && likePressed) {
      this.likes++;
      this.hasLiked = true;
      if (this.hasDisliked) {
        this.hasDisliked = false;
        this.dislikes--;
      }
    }
    if (this.hasDisliked && !likePressed) {
      this.dislikes--;
      this.hasDisliked = false;
    }
    else if (!this.hasDisliked && !likePressed) {
      this.dislikes++;
      this.hasDisliked = true;
      if (this.hasLiked) {
        this.hasLiked = false;
        this.likes--;
      }
    }
  }

  private sendNewOpinion(): void {
    // Send the new opinion to the server
    let opinion: Opinion = {
      paperId: this.paperId,
      opinion: '',
      readerId: this.connectionService.getTokenInfo()!.id
    };

    if (this.hasLiked){
      opinion.opinion = 'LIKE';
    } else if (this.hasDisliked){
      opinion.opinion = 'DISLIKE';
    } else {
      opinion.opinion = 'NO_OPINION';
    }
    this.opinionService.changeOpinion(opinion)
      .subscribe({
        error: () => {
          this.bannerService.showBanner("Erreur lors de l'enregistrement de votre opinion. Veuillez réessayer ultérieurement",
            BannerType.ERROR);
        }
      });
  }
}
