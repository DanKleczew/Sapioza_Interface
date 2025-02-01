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

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {
  protected paperId!: number;
  protected reviews?: RichReview[] = [];

  protected hasCommented: boolean = false;

  protected formComment = new FormGroup({
    comment: new FormControl('', Validators.required)
  });

  constructor(private route: ActivatedRoute,
              private paperQueryService: PaperQueryService,
              private router: Router,
              private userQueryService: UserService,
              private paperOutputService: PaperOutputService,
              protected connectionService: ConnectionService) {
  }

  ngOnInit() {
    this.paperId = Number(this.route.snapshot.paramMap.get('paperId'));

    if (isNaN(this.paperId)) {
      alert('Ce papier n\'existe pas');
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
            let richReview: RichReview = {review: review, authorFullName: '-Compte Supprimé-'};
            richReview.review = review;

            this.userQueryService.userInfo(review.authorId)
              .subscribe({
                next : (response: UserInfoData) => {
                  richReview.authorFullName = response.firstName + " " + response.name;
                  this.reviews?.push(richReview);
                },
                error: () => {
                  this.reviews?.push(richReview);
                }
              });
          }
        },
        error: () => {
          alert('Ce papier n\'existe pas');
          this.router.navigate(['/']);
          return;
        }
      });
  }

  protected submit(): void{
    if (this.formComment.valid){
      if (!this.connectionService.isLogged()) {
        //Impossible théoriquement
        alert('Vous devez être connecté pour commenter');
        return;
      }
      if (this.hasCommented) {
        // Impossible théoriquement
        alert('Vous avez déjà commenté ce papier');
        return;
      }
      this.paperOutputService.addReview(
        this.paperId,
        this.connectionService.getTokenInfo().id,
        this.formComment.get('comment')!.value!)
          .subscribe({
            next: () => {
              alert('Commentaire ajouté');
              this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate(['/comments/' + this.paperId], { state: this.history.state });
              });
            },
            error: () => {
              alert('Erreur lors de l\'ajout du commentaire, veuillez réessayer plus tard');
            }
          });
    }
  }

  protected readonly history = history;
}
