import { Component } from '@angular/core';
import {ButtonComponent} from "../../widgets/buttons/button/button.component";

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  fields: string[] = [
    "COMPUTER_SCIENCE",
    "MATHEMATICS",
    "PHYSICS",
    "CHEMISTRY",
    "BIOLOGY",
    "MEDICINE",
    "ECONOMICS",
    "LAW",
    "LITERATURE",
    "HISTORY",
    "PHILOSOPHY",
    "PSYCHOLOGY",
    "SOCIOLOGY",
    "POLITICAL_SCIENCE",
    "EDUCATION",
    "ENGINEERING",
    "ART"
  ]
}
