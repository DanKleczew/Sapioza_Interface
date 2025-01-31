import {Component} from '@angular/core';
import {ButtonComponent} from "../widgets/buttons/button/button.component";
import {ActivatedRoute, Router} from "@angular/router";
import {IconButtonComponent} from "../widgets/buttons/icon-button/icon-button.component";
import {ConnectionService} from "../../Services/connection.service";
import {PaperQueryService} from "../../Services/paper-query.service";
import {PaperMetaData} from "../../Interfaces/paper-meta-data";
import {OpinionService} from "../../Services/opinion.service";
import {Opinion} from "../../Interfaces/opinion";

@Component({
  selector: 'app-paper-focus',
  standalone: true,
  imports: [
    ButtonComponent,
    IconButtonComponent
  ],
  templateUrl: './paper-focus.component.html',
  styleUrl: './paper-focus.component.scss'
})
export class PaperFocusComponent {

  private paperId!: number;
  protected paperMetaData?: PaperMetaData;

  protected likes: number = 0;
  protected dislikes: number = 0;
  protected hasLiked: boolean = false;
  protected hasDisliked: boolean = false;

  constructor(private route : ActivatedRoute,
              private router : Router,
              private paperQueryService: PaperQueryService,
              protected connectionService : ConnectionService,
              private opinionService: OpinionService) {
  }

  ngOnInit() {
    this.paperId = Number(this.route.snapshot.paramMap.get('paperId'));
    console.log(this.paperId);
    if (isNaN(this.paperId)) {
      alert("Vous essayez d'accéder à un article qui n'existe pas.");
      this.router.navigate(['/']);
      return;
    }
    this.paperQueryService.queryPaperMetaData(this.paperId).subscribe((paperMetaData: PaperMetaData) => {
      this.paperMetaData = paperMetaData;
      this.likes = paperMetaData.paperDTO.likes;
      this.dislikes = paperMetaData.paperDTO.dislikes;
      if(this.connectionService.isLogged()) {
          this.opinionService.getOpinion(this.paperId, this.connectionService.getTokenInfo()!.id)
            .subscribe(
              next => {
                console.log(next);
                if (next.opinion === 'LIKE') {
                  this.hasLiked = true;
                } else if (next.opinion === 'DISLIKE') {
                  this.hasDisliked = true;
                }
              },
              error => {
              }
              );
      }
    }, error => {
      alert("Vous essayez d'accéder à un article qui n'existe pas.");
      this.router.navigate(['/']);
      return;
    });
  }


  protected openArticle() {
    window.open('http://51.178.59.232:8082/papers/pdf/' + this.paperId, '_blank');
  }

  public changeOpinion(likePressed: boolean){
    if (!this.connectionService.isLogged()) {
      return;
    }
    // Calcul (et affichage) du changement d'opinion
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

    // A partir du calcul, envoi au serveur de la nouvelle opinion
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
    this.opinionService.changeOpinion(opinion);
  }
}
