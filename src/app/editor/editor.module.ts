import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { EditorComponent } from './editor.component';
import { ColorSchemeTableComponent } from './color-scheme-table/color-scheme-table.component';
import { ReadabilityViewComponent } from './color-scheme-table/readability-view.component';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent
  }
];

@NgModule({
  declarations: [
    EditorComponent,
    ColorSchemeTableComponent,
    ReadabilityViewComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class EditorModule {}
