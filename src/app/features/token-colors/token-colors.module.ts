import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { TokenColorsComponent } from './token-colors.component';
import { ColorViewComponent } from './components/color-view/color-view.component';
import { TokenColorsToolbarComponent } from './components/token-colors-toolbar/token-colors-toolbar.component';
import { FontStyleViewComponent } from './components/font-style-view/font-style-view.component';
import { HowToComponent } from './components/how-to/how-to.component';
import { TokenColorsTableComponent } from './components/token-colors-table/token-colors-table.component';
import { TokenColorsListComponent } from './components/token-colors-list/token-colors-list.component';

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
    FontStyleViewComponent,
    HowToComponent,
    TokenColorsTableComponent,
    TokenColorsListComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class TokenColorsModule {}
