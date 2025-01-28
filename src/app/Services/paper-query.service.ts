import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PaperQueryService {

  constructor(private http : HttpClient) {
  }

  public queryPapers(paperId: number) {
    this.http.get('/papers/' + 201).subscribe(paperMD => {
      console.log(paperMD);
    });
  }
}
