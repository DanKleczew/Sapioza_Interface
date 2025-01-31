import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {NgTemplateOutlet} from "@angular/common";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './button.component.html',
  styleUrl: '../button.component.scss'
})
export class ButtonComponent {
  @Input() link?: string;

}
