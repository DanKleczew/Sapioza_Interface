import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './icon-button.component.html',
  styleUrl: '../button.component.scss'
})
export class IconButtonComponent {
  @Input() link?: string;
  @Input() icon!: string;
}
