import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PaperCreation} from "../Interfaces/paper-creation";
import {Observable} from "rxjs";
import {SuppressionObject} from "../Interfaces/suppression-object";
import {Review} from "../Interfaces/review";

@Injectable({
  providedIn: 'root'
})
export class PaperOutputService {

  constructor(private http : HttpClient) { }

  public postNewPaper(publishedPaper : PaperCreation) : Observable<any>  {
    return this.http.post('/papers/submit', publishedPaper);
  }

  public modifyPaper(paperId: number, body: string, authorId: number) : Observable<any> {
    return this.http.patch('/paper/alter', {
      "paperId": paperId,
      "body": body,
      "authorId": authorId
    });
  }

  public deletePaper(suppressionObject: SuppressionObject): Observable<any> {
    return this.http.delete('/papers/delete', {body: suppressionObject});
  }

  public addReview(paperId: number, userId: number, comment: string): Observable<any>{
    let review: Review = {
      paperId: paperId,
      authorId: userId,
      comment: comment
    }
    return this.http.post('/review/post', review);
  }

}
