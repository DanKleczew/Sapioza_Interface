import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserInfoData} from "../Interfaces/user-info-data";
import {LoginData} from "../Interfaces/login-data";
import {RegisterData} from "../Interfaces/register-data";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public userInfo(userId: number | undefined): Observable<UserInfoData> {
    return this.http.get<UserInfoData>('/user/getInfo/' + userId);
  }

  public userInfoByUuid(uuid: string): Observable<UserInfoData> {
    return this.http.get<UserInfoData>('/user/getInfoByUuid/' + uuid);
  }

  public userLogin(email: string, password: string): Observable<UserInfoData> {
    return this.http.get<UserInfoData>('/user/connection/'+email+'/'+password);
  }

  public userLoginLoginData(formData: LoginData): Observable<UserInfoData> {
    return this.userLogin(formData.email, formData.password);
  }

  public createAccount(registerData: RegisterData): void {
    this.http.post('/user/create/createAccount',
      {registerData}).subscribe(response => {
      console.log(response);
    });
  }
}
