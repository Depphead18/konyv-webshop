import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceWithCurrency',
  standalone: true
})
export class PriceWithCurrencyPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) return '';
    return value.toLocaleString('hu-HU') + ' Ft';
  }
}
