import { Directive, forwardRef } from '@angular/core';
import { FormControl, NG_VALIDATORS, ValidatorFn } from '@angular/forms';

import { ColorSchemeService } from 'app/core/services/color-scheme.service';

function validateJsonFactory(colorSchemeService: ColorSchemeService) {
  return (control: FormControl) => {
    if (control.value) {
      const errorMsg = colorSchemeService.validateColorSchemeJson(
        control.value
      );
      if (errorMsg) {
        return { validateJson: { message: errorMsg } };
      }
    }
    return null;
  };
}

@Directive({
  selector: '[cseJsonValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => JsonValidatorDirective),
      multi: true
    }
  ]
})
export class JsonValidatorDirective {
  validator: ValidatorFn;

  constructor(colorSchemeService: ColorSchemeService) {
    this.validator = validateJsonFactory(colorSchemeService);
  }

  validate(control: FormControl) {
    return this.validator(control);
  }
}
