import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rich-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './rich-button.component.html',
  styleUrl: '../button.component.scss'
})
export class RichButtonComponent {
  @Input() link!: string;
  @Input() icon!: string;

}
