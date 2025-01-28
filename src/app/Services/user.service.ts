import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public userInfo(userId: number | undefined) {
    this.http.get('/User/getInfo/' + userId).subscribe(userInfo => {
      console.log(userInfo);
    });
  }
}
