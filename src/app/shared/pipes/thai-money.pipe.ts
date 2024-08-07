import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'thaiMoney' })
export class ThaiMoneyPipe implements PipeTransform {
  transform(value: number | string, decimalCount: number = 2): string {
    // Check if the value is not a valid number
    if (isNaN(Number(value))) {
      return 'Invalid Number';
    }

    // Convert the value to a number
    const numericValue = Number(value);

    // Format the number as Thai Baht
    const formattedValue = numericValue.toLocaleString('en-US', {
      style: 'currency',
      currency: 'THB',
      minimumFractionDigits: decimalCount,
      maximumFractionDigits: decimalCount,
    });

    // Replace the default currency symbol 'THB' with an empty string
    return formattedValue.replace('THB', '');
  }
}
