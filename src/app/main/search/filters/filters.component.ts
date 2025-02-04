import {Component, EventEmitter, Output} from '@angular/core';
import {ButtonComponent} from "../../widgets/buttons/button/button.component";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Filter} from "../../../Interfaces/filter";
import {FieldsEnum} from "../../../Constantes/Fields";
import {PaperFieldPipe} from "../../../Pipe/paper-field.pipe";
import {BannerService} from "../../../Services/banner.service";
import {BannerType} from "../../../Constantes/banner-type";

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, PaperFieldPipe],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss'
})
export class FiltersComponent {
  @Output() filtersEvent = new EventEmitter<Filter>();

  constructor(private bannerService: BannerService) {
  }

  formFilters = new FormGroup({
    title: new FormControl(''),
    abstract_: new FormControl(''),
    keywords: new FormControl(''),
    revue: new FormControl(''),
    DOI: new FormControl(''),
    field: new FormControl('all'),
    AscDate: new FormControl(''),
    DescDate: new FormControl(''),
    limit: new FormControl('', [Validators.min(1)]),
  });

  protected fields : string[] = FieldsEnum;

  protected findPapers(){
    if (this.formFilters.invalid){
      this.bannerService.showBanner("Veuillez précisez une limite positive de papiers", BannerType.WARNING);
      return;
    }
    let filters : Filter = {
      title: this.formFilters.get('title')?.value,
      abstract_: this.formFilters.get('abstract_')?.value,
      keywords: this.formFilters.get('keywords')?.value,
      revue: this.formFilters.get('revue')?.value,
      DOI: this.formFilters.get('DOI')?.value,
      researchField: this.formFilters.get('field')?.value,
      AscDate: this.formFilters.get('AscDate')?.value ? Boolean(this.formFilters.get('AscDate')?.value) : null,
      DescDate: this.formFilters.get('DescDate')?.value ? Boolean(this.formFilters.get('DescDate')?.value) : null,
      limit: this.formFilters.get('limit')?.value ? Number(this.formFilters.get('limit')?.value): null
    }
    this.filtersEvent.emit(filters);
  }
}
