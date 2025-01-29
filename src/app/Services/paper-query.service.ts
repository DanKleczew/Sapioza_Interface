import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import { Observable } from 'rxjs';
import { PaperMetaData } from '../Interfaces/paper-meta-data';
import {Filter} from "../Interfaces/filter";

@Injectable({
  providedIn: 'root'
})
export class PaperQueryService {

  constructor(private http : HttpClient) {
  }

  public queryPaperMetaData(paperId: number) : Observable<PaperMetaData> {
    return this.http.get<PaperMetaData>('/papers/' + paperId);;
    };

  // public postNewPaper(){
  //   this.http.post('/papers/submit', {"metaData": {
  //       "title": "Sapioza: Une nouvelle plateforme de publication extatique",
  //       "authorId": 203,
  //       "field": "COMPUTER_SCIENCE",
  //       "publishedIn": "The great Sapioza journal",
  //       "keywords": "Arbre, Banane, Chat",
  //       "abstract_": "Un très très bel abstract de saison. Un peu plus long pour tester le retour à la ligne qui marche bien entendu n'est ce pas Téodora ?",
  //       "DOI": "https://sapioza.com/doi/10.1000/182"
  //       },
  //       "body": "Ceci est un corps d'article un peu long, mais pas trop non plus. En fait, c'est juste un test pour voir si ça marche. Ceci est un corps d'article un peu long, mais pas trop non plus. En fait, c'est juste un test pour voir si ça marche."
  //   }).subscribe(response => {console.log(response)})
  //   console.log("envoyé");
  // }

  public queryRecent() : Observable<PaperMetaData[]> {
    const params = new HttpParams().set('limit', 9).set('DescDate', true);
    return this.http.get<PaperMetaData[]>('/papers/filter', { params });
  }

  public queryByFilter(filter: Filter): Observable<PaperMetaData[]> {
    return this.http.get<PaperMetaData[]>('/papers/filter');
  }
}
