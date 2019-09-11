import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { CopyColorSchemeDialogModule } from './features/copy-color-scheme-dialog/copy-color-scheme-dialog.module';
import { CopyColorSchemeDialogComponent } from './features/copy-color-scheme-dialog/copy-color-scheme-dialog.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    CopyColorSchemeDialogModule
  ],
  entryComponents: [CopyColorSchemeDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
