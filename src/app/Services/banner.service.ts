import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {BannerType} from "../Constantes/banner-type";

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private _bannerState =
    new BehaviorSubject<{ visible: boolean; message?: string; type?: BannerType }>({visible: false});


  public bannerState =  this._bannerState.asObservable();

  private bannerLife: number = 0;
  private message?: string;
  private type?: BannerType;

  /**
   * Affiche une bannière jusqu'au prochain changement de route
   * @param message Le message à afficher sur la bannière
   * @param type Le type de bannière
   */
  public showBanner(message: string, type: BannerType): void {
    this.bannerLife = 1;
    this.message = message;
    this.type = type;
    this.bannerCountdownTick();
  }

  /**
   * Affiche une bannière qui survit à une redirection
   * @param message Le message à afficher sur la bannière
   * @param type Le type de bannière
   */
  public showPersistentBanner(message: string, type: BannerType): void {
    this.bannerLife = 2;
    this.message = message;
    this.type = type;
    this.bannerCountdownTick();
  }

  /**
   * Affiche une bannière qui se supprime après 'life' redirections
   * @param message Le message à afficher sur la bannière
   * @param type Le type de bannière
   * @param life Le nombre de redirections après lesquelles la bannière disparaît
   */
  public showPersistentBannerWithLife(message: string, type: BannerType, life: number): void {
    this.bannerLife = life;
    this.message = message;
    this.type = type;
    this.bannerCountdownTick();
  }

  /**
   * Cache la bannière
   */
  public hideBanner(): void {
    this.bannerLife = 0;
    this.bannerCountdownTick();
  }

  /**
   * Réduit de 1 le temps de vie de la bannière
   * Ne pas appeler hors du composant root
   */
  public bannerCountdownTick(): void {
    if (this.bannerLife-- > 0) {
      this._bannerState.next({visible: true, message: this.message, type: this.type});
    } else {
      this._bannerState.next({visible: false});
      this.message = undefined;
      this.type = undefined;
    }
  }
}
