import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaperQueryService {

  constructor(private http : HttpClient) {
  }

  public queryPaperMetaData(paperId: number) : Observable<any> {
    return this.http.get('/papers/' + paperId);
    };

  public postNewPaper(){
    this.http.post('/papers/submit', {"metaData": {
        "title": "Sapioza: Une nouvelle plateforme de publication extatique",
        "authorId": 203,
        "field": "COMPUTER_SCIENCE",
        "publishedIn": "The great Sapioza journal",
        "keywords": "Arbre, Banane, Chat",
        "abstract_": "Un très très bel abstract de saison. Un peu plus long pour tester le retour à la ligne qui marche bien entendu n'est ce pas Téodora ?",
        "DOI": "https://sapioza.com/doi/10.1000/182"
        },
        "body": "Ceci est un corps d'article un peu long, mais pas trop non plus. En fait, c'est juste un test pour voir si ça marche. Ceci est un corps d'article un peu long, mais pas trop non plus. En fait, c'est juste un test pour voir si ça marche."
    }).subscribe(response => {console.log(response)})
    console.log("envoyé");
  }
}
