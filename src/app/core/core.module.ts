import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { editorReducer } from './store/editor.reducer';
import { EditorEffects } from './store/editor.effects';
import { environment } from '@env/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot({
      editorState: editorReducer
    }),
    EffectsModule.forRoot([EditorEffects]),
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: 'Color Scheme Editor'
        })
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
