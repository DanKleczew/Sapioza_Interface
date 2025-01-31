import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PaperCreation} from "../Interfaces/paper-creation";
import {Observable} from "rxjs";
import {SuppressionObject} from "../Interfaces/suppression-object";

@Injectable({
  providedIn: 'root'
})
export class PaperOutputService {

  constructor(private http : HttpClient) { }

  public postNewPaper(publishedPaper : PaperCreation) : Observable<any>  {
    console.log(publishedPaper);
    return this.http.post('/papers/submit', publishedPaper);
  }

  public modifyPaper(paperId: number, body: string, authorId: number) : void {
    this.http.patch('/paper/alter', {
      "paperId": paperId,
      "body": body,
      "authorId": authorId
    }).subscribe(response => {
      console.log(response)
    });
  }

  public deletePaper(suppressionObject: SuppressionObject) : void {
    console.log(suppressionObject);
    this.http.delete('/papers/delete', {body: suppressionObject} ).subscribe();

  }
}
