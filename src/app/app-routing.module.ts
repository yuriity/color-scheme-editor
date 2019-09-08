import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'about', pathMatch: 'full' },
  {
    path: 'about',
    loadChildren: () =>
      import('./features/about/about.module').then(m => m.AboutModule)
  },
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
    path: '**',
    redirectTo: 'about'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
