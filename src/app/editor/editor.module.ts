import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';

import { EditorComponent } from './editor.component';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent
  }
];

@NgModule({
  declarations: [EditorComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class EditorModule {}
