import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserInfoData} from "../Interfaces/user-info-data";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public userInfo(userId: number | undefined): Observable<UserInfoData> {
    return this.http.get<UserInfoData>('/User/getInfo/' + userId);
  }
}
