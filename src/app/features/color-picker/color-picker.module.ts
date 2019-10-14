import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';
import { ColorPickerComponent } from './color-picker.component';
import { PointerMovedDirective } from './hex-editor/directives/pointer-moved.directive';
import { HexEditorComponent } from './hex-editor/hex-editor.component';
import { AlphaEditorComponent } from './hex-editor/alpha-editor/alpha-editor.component';
import { HueEditorComponent } from './hex-editor/hue-editor/hue-editor.component';
import { SpectrumEditorComponent } from './hex-editor/spectrum-editor/spectrum-editor.component';
import { ResizedDirective } from './hex-editor/directives/resized.directive';

@NgModule({
  declarations: [
    PointerMovedDirective,
    ColorPickerComponent,
    HexEditorComponent,
    AlphaEditorComponent,
    HueEditorComponent,
    SpectrumEditorComponent,
    ResizedDirective
  ],
  imports: [SharedModule],
  exports: [ColorPickerComponent]
})
export class ColorPickerModule {}
