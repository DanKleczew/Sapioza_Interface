import {Component} from '@angular/core';
import {ButtonComponent} from "../main/widgets/buttons/button/button.component";
import {LoadingComponent} from "../main/widgets/loading/loading.component";
import {BannerService} from "../Services/banner.service";
import {BannerType} from "../Constantes/banner-type";
import {Router} from "@angular/router";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [ButtonComponent, LoadingComponent],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent {

  constructor(private bannerService: BannerService, private router: Router) {
  }

  cacherBanner(){
    this.bannerService.hideBanner();
    //this.bannerService.bannerLifeCycle();
  }

  afficherBanner(){
    this.bannerService.showBanner("Message de la bannière", BannerType.ERROR);
    //this.router.navigate(['/']);
  }
}
