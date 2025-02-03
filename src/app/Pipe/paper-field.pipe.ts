import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paperField',
  standalone: true
})
export class PaperFieldPipe implements PipeTransform {

  transform(value: string): string {
    return value
      .toLowerCase()
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
