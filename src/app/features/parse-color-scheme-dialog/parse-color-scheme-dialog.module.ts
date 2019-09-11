import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { ParseColorSchemeDialogComponent } from './parse-color-scheme-dialog.component';

@NgModule({
  declarations: [ParseColorSchemeDialogComponent],
  imports: [SharedModule],
  exports: [ParseColorSchemeDialogComponent],
  entryComponents: [ParseColorSchemeDialogComponent]
})
export class ParseColorSchemeDialogModule {}
