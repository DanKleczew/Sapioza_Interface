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
    return this.http.get<PaperMetaData>('/papers/' + paperId);
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

  public queryRecent() : Observable<number[]> {
    const params = new HttpParams().set('limit', 9).set('DescDate', true);
    return this.http.get<number[]>('/papers/filter', { params });
  }

  public queryByFilter(filter: Filter): Observable<number[]> {
    let params = new HttpParams();
    if(filter.title) params = params.set('title', filter.title);
    if(filter.abstract_) params = params.set('abstract_', filter.abstract_);
    if(filter.keywords) params = params.set('keywords', filter.keywords);
    if(filter.revue) params = params.set('revue', filter.revue);
    if(filter.field) params = params.set('field', filter.field);
    if(filter.AscDate) params = params.set('AscDate', filter.AscDate);
    if(filter.DescDate) params = params.set('DescDate', filter.DescDate);
    if(filter.DOI) params = params.set('DOI', filter.DOI);
    if(filter.limit) params = params.set('limit', filter.limit);
    console.log(params.toString());
    return this.http.get<number[]>('/papers/filter' , { params });
  }

}
