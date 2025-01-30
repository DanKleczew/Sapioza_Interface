import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PaperCreation} from "../Interfaces/paper-creation";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PaperOutputService {

  constructor(private http : HttpClient) { }

  public postTestPaper(){
    this.http.post('/papers/submit', {"metaData": {
        "title": "Test Article Title",
        "authorId": 202,
        "field": "ART",
        "publishedIn": "Test Journal",
        "keywords": "Test keywords",
        "abstract_": "Test Abstract",
        "DOI": "https://test.com/doi/10.1000/182"
      },
      "body": "Test body Test body Test body Test body Test body Test body Test body Test bodyTest bodyTest body Test bodyTest bodyTest body Test body Test body"
    }).subscribe(response => {console.log(response)})
    console.log("envoyé");
    console.log({"metaData": {
        "title": "Test Article Title",
        "authorId": 202,
        "field": "ART",
        "publishedIn": "Test Journal",
        "keywords": "Test keywords",
        "abstract_": "Test Abstract",
        "DOI": "https://test.com/doi/10.1000/182"
      },
      "body": "Test body Test body Test body Test body Test body Test body Test body Test bodyTest bodyTest body Test bodyTest bodyTest body Test body Test body"
    });
  }

  public postNewPaper(publishedPaper : PaperCreation) : Observable<any>  {
    console.log(publishedPaper);
    return this.http.post('/papers/submit', publishedPaper);
  }
}
