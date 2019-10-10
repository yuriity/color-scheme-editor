import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/token-colors/token-colors.module').then(m => m.TokenColorsModule),
    data: { animation: 'TokenColorsPage' }
  },
  {
    path: 'edit-token/:tokenId',
    loadChildren: () =>
      import('./features/edit-token-color/edit-token-color.module').then(
        m => m.EditTokenColorModule
      ),
    data: { animation: 'EditTokenPage' }
  },
  {
    path: 'help',
    loadChildren: () => import('./features/help/help.module').then(m => m.HelpModule),
    data: { animation: 'HelpPage' }
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
