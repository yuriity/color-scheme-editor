import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/token-colors/token-colors.module').then(
        m => m.TokenColorsModule
      )
  },
  {
    path: 'edit-token/:tokenId',
    loadChildren: () =>
      import('./features/edit-token-color/edit-token-color.module').then(
        m => m.EditTokenColorModule
      )
  },
  {
    path: 'help',
    loadChildren: () =>
      import('./features/help/help.module').then(m => m.HelpModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
