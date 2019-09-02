import { NgModule } from '@angular/core';
import { AngularResizedEventModule } from 'angular-resize-event';

import { SharedModule } from 'app/shared/shared.module';
import { ColorPickerComponent } from './color-picker.component';
import { PickColorDirective } from './hex-editor/pick-color.directive';
import { HexEditorComponent } from './hex-editor/hex-editor.component';
import { AlphaEditorComponent } from './hex-editor/alpha-editor/alpha-editor.component';
import { HueEditorComponent } from './hex-editor/hue-editor/hue-editor.component';
import { SpectrumEditorComponent } from './hex-editor/spectrum-editor/spectrum-editor.component';

@NgModule({
  declarations: [
    PickColorDirective,
    ColorPickerComponent,
    HexEditorComponent,
    AlphaEditorComponent,
    HueEditorComponent,
    SpectrumEditorComponent
  ],
  imports: [SharedModule, AngularResizedEventModule],
  exports: [ColorPickerComponent]
})
export class ColorPickerModule {}
