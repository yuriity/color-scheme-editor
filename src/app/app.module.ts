import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { ParseColorSchemeDialogModule } from './features/parse-color-scheme-dialog/parse-color-scheme-dialog.module';
import { ParseColorSchemeDialogComponent } from './features/parse-color-scheme-dialog/parse-color-scheme-dialog.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    ParseColorSchemeDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
