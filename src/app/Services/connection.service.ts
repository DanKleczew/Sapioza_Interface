import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {TokenData} from "../Interfaces/token-data";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private router: Router,
              private userSerivice : UserService) {}

  saveToken(tokenData: TokenData) {
    localStorage.setItem('tokenSapioza', tokenData.uuid);
    localStorage.setItem('nameSapioza', tokenData.name);
    localStorage.setItem('firstNameSapioza', tokenData.firstName);
    localStorage.setItem('idSapioza', String(tokenData.id));
  }

  isLogged(): boolean {
    try {
      let tokenData: TokenData = {
        name: String(localStorage.getItem('tokenSapioza')),
        firstName: String(localStorage.getItem('nameSapioza')),
        uuid: String(localStorage.getItem('firstNameSapioza')),
        id: 0
      }
      tokenData.id = Number(localStorage.getItem('idSapioza'));
      return !this.checkEmpty(tokenData);
    }
    catch (e) {
        return false;
      }
    }

    checkAccess(): void {
      if (!this.isLogged()) {
        this.router.navigate(['/connection']);
      }
    }

  checkEmpty(tokenData: TokenData): boolean {
    if(tokenData.uuid == null || tokenData.name == null || tokenData.firstName == null || tokenData.id == null) {
      return true;
    }
    if(tokenData.uuid == "null" || tokenData.name == "null" || tokenData.firstName == "null") {
      return true;
    }
    if(tokenData.uuid == "" || tokenData.name == "" || tokenData.firstName == "" || tokenData.id == 0) {
      return true;
    }
    return false;
  }

  logout():void {
    localStorage.removeItem('tokenSapioza');
    localStorage.removeItem('nameSapioza');
    localStorage.removeItem('firstNameSapioza');
    this.router.navigate(['/']);
  }

  getTokenInfo(): TokenData {
    let tokenData: TokenData = {
      name: String(localStorage.getItem('nameSapioza')),
      firstName: String(localStorage.getItem('firstNameSapioza')),
      uuid: String(localStorage.getItem('tokenSapioza')),
      id: 0
    };
    tokenData.id = Number(localStorage.getItem('idSapioza'));
    return tokenData;
  }

  updateTokenInfo(userId: number): void {
    console.log(userId);
    this.userSerivice.userInfo(userId).subscribe(user => {
      let tokenData: TokenData = {
        name: user.name,
        firstName: user.firstName,
        uuid: this.getTokenInfo().uuid,
        id: this.getTokenInfo().id
      }
      this.saveToken(tokenData);
    });
  }
}
