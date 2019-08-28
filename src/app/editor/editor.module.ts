import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { EditorComponent } from './editor.component';
import { ReadabilityViewComponent } from './components/readability-view/readability-view.component';
import { ColorViewComponent } from './components/color-view/color-view.component';
import { EditorToolbarComponent } from './components/editor-toolbar/editor-toolbar.component';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent
  }
];

@NgModule({
  declarations: [
    EditorComponent,
    ReadabilityViewComponent,
    ColorViewComponent,
    EditorToolbarComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class EditorModule {}
