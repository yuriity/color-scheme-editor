import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { ExportColorSchemeDialogComponent } from './export-color-scheme-dialog.component';

@NgModule({
  declarations: [ExportColorSchemeDialogComponent],
  imports: [SharedModule],
  exports: [ExportColorSchemeDialogComponent],
  entryComponents: [ExportColorSchemeDialogComponent]
})
export class ExportColorSchemeDialogModule {}
