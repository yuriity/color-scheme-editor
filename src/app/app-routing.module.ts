import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'token-colors', pathMatch: 'full' },
  {
    path: 'token-colors',
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
    path: 'about',
    loadChildren: () =>
      import('./features/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'help',
    loadChildren: () =>
      import('./features/help/help.module').then(m => m.HelpModule)
  },
  {
    path: '**',
    redirectTo: 'token-colors'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
