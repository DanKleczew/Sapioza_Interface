import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {BannerComponent} from "./widgets/banner/banner.component";
import {BannerService} from "../Services/banner.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BannerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router, private bannerService: BannerService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.bannerService.bannerCountdownTick();
      }
    });
  }
}
