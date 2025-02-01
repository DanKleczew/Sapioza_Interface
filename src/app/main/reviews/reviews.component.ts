import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PaperQueryService} from "../../Services/paper-query.service";
import {Review} from "../../Interfaces/review";
import {ButtonComponent} from "../widgets/buttons/button/button.component";
import {UserService} from "../../Services/user.service";
import {RichReview} from "../../Interfaces/rich-review";
import {ConnectionService} from "../../Services/connection.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PaperOutputService} from "../../Services/paper-output.service";

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
    }
    this.paperQueryService.getReviews(this.paperId).subscribe(
      (response) => {
        for (let review of response){
          if (this.connectionService.isLogged() && review.authorId == this.connectionService.getTokenInfo().id) {
            this.hasCommented = true;
          }
          let richReview: RichReview = {review: review, authorFullName: '-Compte Supprimé-'};
          richReview.review = review;
          this.userQueryService.userInfo(review.authorId).subscribe(response => {
            richReview.authorFullName = response.firstName + " " + response.name;
            this.reviews?.push(richReview);
          }, error => {
            this.reviews?.push(richReview);
          });
        }
      }, (error: any) => {
        alert('Ce papier n\'existe pas');
        this.router.navigate(['/']);
      }
    );
  }

  protected submit(): void{
    if (this.formComment.valid){
      if (this.connectionService.isLogged()) {
        this.paperOutputService.addReview(
          this.paperId,
          this.connectionService.getTokenInfo().id,
          this.formComment.get('comment')!.value!);
        alert('Commentaire ajouté');
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/comments/' + this.paperId], { state: this.history.state });
        });
      } else {
        alert('Vous devez être connecté pour commenter');
      }
    }
  }

  protected readonly history = history;
}
