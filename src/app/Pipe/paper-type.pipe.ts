import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paperType',
  standalone: true
})
export class PaperTypePipe implements PipeTransform {

  transform(value: string): string {
    return value
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

}
