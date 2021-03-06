import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTokenColorComponent } from './edit-token-color.component';
import { SharedModule } from 'app/shared/shared.module';
import { ColorPickerModule } from '../color-picker/color-picker.module';
import { PreviewComponent } from './preview/preview.component';

const routes: Routes = [
  {
    path: '',
    component: EditTokenColorComponent
  }
];

@NgModule({
  declarations: [EditTokenColorComponent, PreviewComponent],
  imports: [SharedModule, RouterModule.forChild(routes), ColorPickerModule]
})
export class EditTokenColorModule {}
