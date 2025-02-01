import { Component } from '@angular/core';
import {NgClass} from "@angular/common";
import {BannerService} from "../../../Services/banner.service";
import {BannerType} from "../../../Constantes/banner-type";

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss'
})
export class BannerComponent {

  constructor(private bannerService: BannerService) {
    this.bannerService.bannerState.subscribe((state) => {
      this.banner = state;
    });
  }

  protected banner: { visible: boolean; message?: string; type?: BannerType } = {
    visible: false
  }
}
