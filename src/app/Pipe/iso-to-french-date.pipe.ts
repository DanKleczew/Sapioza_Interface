import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isoToFrenchDate',
  standalone: true
})
export class IsoToFrenchDatePipe implements PipeTransform {

  transform(dateString: string): string {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }
}
