import {Component, EventEmitter, Output} from '@angular/core';
import {ButtonComponent} from "../../widgets/buttons/button/button.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Filter} from "../../../Interfaces/filter";
import {PaperQueryService} from "../../../Services/paper-query.service";

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  @Output() filtersEvent = new EventEmitter<Filter>();

  formFilters = new FormGroup({
    title: new FormControl(''),
    abstract_: new FormControl(''),
    keywords: new FormControl(''),
    revue: new FormControl(''),
    DOI: new FormControl(''),
    field: new FormControl(''),
    AscDate: new FormControl(''),
    DescDate: new FormControl(''),
    limit: new FormControl('', [Validators.min(1)]),
  });

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

  protected findPapers(){
    let filters : Filter = {
      title: this.formFilters.getRawValue().title,
      abstract_: this.formFilters.getRawValue().abstract_,
      keywords: this.formFilters.getRawValue().keywords,
      revue: this.formFilters.getRawValue().revue,
      DOI: this.formFilters.getRawValue().DOI,
      field: this.formFilters.getRawValue().field,
      AscDate: Boolean(this.formFilters.getRawValue().AscDate),
      DescDate: Boolean(this.formFilters.getRawValue().DescDate),
      limit: Number(this.formFilters.getRawValue().limit)
    }
    console.log(filters);
    this.filtersEvent.emit(filters);
  }
}
