import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {TokenData} from "../Interfaces/token-data";

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  constructor(private router: Router) {}

  saveToken(tokenData: TokenData) {
    localStorage.setItem('tokenSapioza', tokenData.uuid);
    localStorage.setItem('nameSapioza', tokenData.name);
    localStorage.setItem('firstNameSapioza', tokenData.firstName);
    localStorage.setItem('idSapioza', String(tokenData.id));
  }

  isLogged(): boolean {
    try {
      let tokenData: TokenData = {
        name: "",
        firstName: "",
        uuid: "",
        id: 0
      }
      console.log(tokenData);
      tokenData.uuid = String(localStorage.getItem('tokenSapioza'));
      tokenData.name = String(localStorage.getItem('nameSapioza'));
      tokenData.firstName = String(localStorage.getItem('firstNameSapioza'));
      tokenData.id = Number(localStorage.getItem('idSapioza'));
      console.log(tokenData);
      return !this.checkEmpty(tokenData);
    }
    catch (e) {
        return false;
      }
    }

  checkEmpty(tokenData: TokenData): boolean {
    if(tokenData.uuid == null || tokenData.name == null || tokenData.firstName == null || tokenData.id == null) {
      return true;
    }
    if(tokenData.uuid == "" || tokenData.name == "" || tokenData.firstName == "" || tokenData.id == 0) {
      return true;
    }
    console.log("TokenData is not empty");
    return false;
  }

  logout():void {
    localStorage.removeItem('tokenSapioza');
    localStorage.removeItem('nameSapioza');
    localStorage.removeItem('firstNameSapioza');
    this.router.navigate(['/']);
  }

  getTokenInfo(): TokenData | null {
    if(!this.isLogged()) {
      return null;
    }
    let tokenData: TokenData = {
      name: "",
      firstName: "",
      uuid: "",
      id: 0
    };
    tokenData.name = String(localStorage.getItem('nameSapioza'));
    tokenData.firstName = String(localStorage.getItem('firstNameSapioza'));
    tokenData.uuid = String(localStorage.getItem('tokenSapioza'));
    tokenData.id = Number(localStorage.getItem('idSapioza'));
    return tokenData;
  }
}
