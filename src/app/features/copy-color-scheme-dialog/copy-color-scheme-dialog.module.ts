import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { CopyColorSchemeDialogComponent } from './copy-color-scheme-dialog.component';

@NgModule({
  declarations: [CopyColorSchemeDialogComponent],
  imports: [SharedModule],
  exports: [CopyColorSchemeDialogComponent],
  entryComponents: [CopyColorSchemeDialogComponent]
})
export class CopyColorSchemeDialogModule {}
