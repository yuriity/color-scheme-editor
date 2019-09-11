import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { TokenColorsComponent } from './token-colors.component';
import { ColorViewComponent } from './components/color-view/color-view.component';
import { TokenColorsToolbarComponent } from './components/token-colors-toolbar/token-colors-toolbar.component';
import { FontStyleViewComponent } from './components/font-style-view/font-style-view.component';

const routes: Routes = [
  {
    path: '',
    component: TokenColorsComponent
  }
];

@NgModule({
  declarations: [
    TokenColorsComponent,
    ColorViewComponent,
    TokenColorsToolbarComponent,
    FontStyleViewComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class TokenColorsModule {}
