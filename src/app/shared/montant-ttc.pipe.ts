import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'montantTTC',
  standalone: true,
})
export class MontantTTCPipe implements PipeTransform {
  transform(ht: number): number {
    return ht + (ht * 20) / 100;
  }
}
