import { Component, Input } from '@angular/core';
import {NgTemplateOutlet} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rich-button',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './rich-button.component.html',
  styleUrl: '../button.component.scss'
})
export class RichButtonComponent {
  @Input() link?: string;
  @Input() icon!: string;

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
