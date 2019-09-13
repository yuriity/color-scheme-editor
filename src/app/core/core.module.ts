import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'environments/environment';
import { reducers, metaReducers } from './store/core.state';
import { TokensEffects } from './store/tokens/tokens.effects';
import { ExportColorSchemeDialogModule } from 'app/features/export-color-scheme-dialog/export-color-scheme-dialog.module';
import { ParseColorSchemeDialogComponent } from 'app/features/parse-color-scheme-dialog/parse-color-scheme-dialog.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,

    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([TokensEffects]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: 'Color Scheme Editor'
        }),

    ExportColorSchemeDialogModule
  ]
})
export class CoreModule {
  /* make sure CoreModule is imported only by one NgModule the AppModule */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
