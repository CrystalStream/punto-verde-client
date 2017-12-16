import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * @description validator function for type number inputs min values
 * @param {Number} min
 * @returns {ValidatorFn}
 */
export function minValue(min: Number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const input = control.value;
    return input < min ? { minValue: { min } } : null;
  };
}
