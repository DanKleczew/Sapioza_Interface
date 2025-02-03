import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, timeout} from "rxjs";
import {UserInfoData} from "../Interfaces/user-info-data";
import {LoginData} from "../Interfaces/login-data";
import {RegisterData} from "../Interfaces/register-data";
import {UpdateUserData} from "../Interfaces/updateUser/update-user-data";
import {NameUpdateData} from "../Interfaces/updateUser/name-update-data";
import {FirstNameUpdateData} from "../Interfaces/updateUser/first-name-update-data";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {PasswordUpdateData} from "../Interfaces/updateUser/password-update-data";
import {DeleteUserData} from "../Interfaces/updateUser/delete-user-data";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  public userInfo(userId: number | undefined): Observable<UserInfoData> {
    console.log("user.service.ts: userInfo: userId: " , userId);
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

  public createAccount(registerData: RegisterData): Observable<any> {
    return this.http.post('/user/create/createAccount', registerData, {responseType : "text"});
  }

  public updateName(nameUpdateData: NameUpdateData): Observable<any> {
    return this.http.post('/user/update/name', nameUpdateData, {responseType: "text"});
  }

  public updateFirstName(firstNameUpdateData: FirstNameUpdateData): Observable<any> {
    return this.http.post('/user/update/firstName', firstNameUpdateData, {responseType: "text"});
  }

  public changePassword(passwordUpdateData: PasswordUpdateData): Observable<any> {
    return this.http.post('/user/update/password', passwordUpdateData, {responseType: "text"});
  }

  public followUser(userId: number, followedId: number): Observable<any> {
    return this.http.patch('/user/subscribe/' + followedId + '/' + userId, null);
  }

  public getFollowers(userId: number): Observable<number[]> {
    return this.http.get<number[]>('/user/getSubscribers/' + userId);
  }

  public deleteAccount(deleteUserData: DeleteUserData): Observable<any> {
    return this.http.delete('/user/delete', {body: deleteUserData});
  }
}
