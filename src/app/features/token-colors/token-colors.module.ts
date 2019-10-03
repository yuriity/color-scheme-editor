import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { TokenColorsComponent } from './token-colors.component';
import { ColorViewComponent } from './components/color-view/color-view.component';
import { FontStyleViewComponent } from './components/font-style-view/font-style-view.component';
import { HowToComponent } from './components/how-to/how-to.component';
import { TokenColorsListComponent } from './components/token-colors-list/token-colors-list.component';
import { SortByComponent } from './components/sort-by/sort-by.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

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
    FontStyleViewComponent,
    HowToComponent,
    TokenColorsListComponent,
    SortByComponent,
    SearchBarComponent
  ],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class TokenColorsModule {}
