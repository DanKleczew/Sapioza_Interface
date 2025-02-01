import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable} from "rxjs";
import {Opinion} from "../Interfaces/opinion";

@Injectable({
  providedIn: 'root'
})
export class OpinionService {

  constructor(private http : HttpClient) { }

  public getOpinion(paperId: number, userId: number) : Observable<Opinion> {
    return this.http.get<Opinion>('/opinion/getSingle/' + paperId + '/' + userId);
  }

  public changeOpinion(opinion: Opinion) : Observable<any> {
    return this.http.post('/opinion/change', opinion);
  }
}
