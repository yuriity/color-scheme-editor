import { NgModule } from '@angular/core';

import { HelpComponent } from './help.component';
import { SharedModule } from 'app/shared/shared.module';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HelpComponent
  }
];

@NgModule({
  declarations: [HelpComponent],
  imports: [SharedModule, RouterModule.forChild(routes)]
})
export class HelpModule {}
