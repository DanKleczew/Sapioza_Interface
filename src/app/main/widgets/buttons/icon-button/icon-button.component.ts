import { Component, Input } from '@angular/core';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './icon-button.component.html',
  styleUrl: '../button.component.scss'
})
export class IconButtonComponent {
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
