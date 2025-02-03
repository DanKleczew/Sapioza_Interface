import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PaperQueryService} from "../../Services/paper-query.service";
import {ButtonComponent} from "../widgets/buttons/button/button.component";
import {UserService} from "../../Services/user.service";
import {RichReview} from "../../Interfaces/rich-review";
import {ConnectionService} from "../../Services/connection.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PaperOutputService} from "../../Services/paper-output.service";
import {Review} from "../../Interfaces/review";
import {UserInfoData} from "../../Interfaces/user-info-data";
import {BannerService} from "../../Services/banner.service";
import {BannerType} from "../../Constantes/banner-type";
import {HttpErrorResponse} from "@angular/common/http";
import {LoadingComponent} from "../widgets/loading/loading.component";

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    LoadingComponent
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {
  protected paperId!: number;
  protected reviews?: RichReview[];

  protected hasCommented: boolean = false;
  protected title: string = '';

  protected formComment = new FormGroup({
    comment: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(500)])
  });

  constructor(private route: ActivatedRoute,
              private paperQueryService: PaperQueryService,
              private router: Router,
              private userQueryService: UserService,
              private paperOutputService: PaperOutputService,
              protected connectionService: ConnectionService,
              private bannerService: BannerService) {
  }

  ngOnInit() {
    this.paperId = Number(this.route.snapshot.paramMap.get('paperId'));

    if (isNaN(this.paperId)) {
      this.bannerService
        .showPersistentBanner('L\'identifiant du papier est invalide',
          BannerType.WARNING);
      this.router.navigate(['/']);
      return;
    }

    this.paperQueryService.getReviews(this.paperId)
      .subscribe({
        next: (reviews : Review[]) => {
          for (let review of reviews) {
            if (this.connectionService.isLogged() && review.authorId === this.connectionService.getTokenInfo().id) {
              this.hasCommented = true;
            }
            let richReview: RichReview = {review: review, authorFullName: ''};
            richReview.review = review;
            this.userQueryService.userInfo(review.authorId)
              .subscribe({
                next : (response: UserInfoData) => {
                  richReview.authorFullName = response.firstName + " " + response.name;
                  this.reviews?.push(richReview);
                },
                error: (error : HttpErrorResponse) => {
                  if (error.status === 404) {
                    richReview.authorFullName = '-Compte Supprimé-';
                  } else {
                    this.bannerService.showBanner('Erreur lors de la récupération de l\'identité d\'un commentateur',
                      BannerType.WARNING);
                    richReview.authorFullName = '-Utilisateur inconnu-';
                  }
                  this.reviews?.push(richReview);
                }
              });
          }
          if (this.reviews === undefined){
            this.reviews = [];
          }
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.bannerService
              .showPersistentBanner('Vous essayez de consulter les commentaires d\'un papier qui n\'existe pas',
                BannerType.WARNING);
            this.router.navigate(['/']);
            return;
          }
          this.bannerService.showBanner('Erreur lors de la récupération des commentaires', BannerType.ERROR);
          return;
        }
      });
      this.paperQueryService.getTitle(this.paperId).subscribe({
        next: (title: string)=> {
          this.title = title;
          },
        error: () => {
          this.bannerService.showBanner('Erreur lors de la récupération du titre du papier', BannerType.WARNING);
        }
      });
  }


  protected submit(): void{
    if (!this.formComment.valid) {
      this.bannerService.showBanner('Le commentaire doit contenir entre 5 et 500 caractères', BannerType.INFO);
      return;
    }
    if (!this.connectionService.isLogged()) {
      //Impossible théoriquement
      this.bannerService.showBanner('Vous devez être connecté pour commenter', BannerType.INFO);
      return;
    }
    if (this.hasCommented) {
      // Impossible théoriquement
      this.bannerService.showBanner('Vous avez déjà commenté ce papier', BannerType.INFO);
      return;
    }
    this.paperOutputService.addReview(
      this.paperId,
      this.connectionService.getTokenInfo().id,
      this.formComment.get('comment')!.value!)
      .subscribe({
        next: () => {
          this.bannerService.showPersistentBannerWithLife('Commentaire ajouté', BannerType.SUCCESS, 3);
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate(['/comments/' + this.paperId]);
          });
          },
        error: () => {
          this.bannerService
            .showBanner('Erreur lors de l\'ajout du commentaire, veuillez réessayer plus tard', BannerType.ERROR);
        }
      });
  }
}
