import { Component, Input } from '@angular/core';
import {Router} from '@angular/router';
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './button.component.html',
  styleUrl: '../button.component.scss'
})
export class ButtonComponent {

  @Input() link?: string
  @Input() isHardRedirect: boolean = false;

  constructor(private router: Router) {
  }

  protected redirection(): void{
    if (this.isHardRedirect){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([this.link]);
      });
    } else {
      this.router.navigate([this.link]);
    }
  }

}
