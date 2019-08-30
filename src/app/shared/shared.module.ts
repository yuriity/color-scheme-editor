import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatIconRegistry,
  MatTableModule,
  MatTooltipModule,
  MatSortModule,
  MatInputModule,
  MatProgressBarModule,
  MatDialogModule
} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,

    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatSortModule,
    MatInputModule,
    MatProgressBarModule,
    MatDialogModule,

    HeaderComponent
  ]
})
export class SharedModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.addSvgIcon('file-export');
    this.addSvgIcon('code');
    this.addSvgIcon('eye');
    this.addSvgIcon('eye-slash');
    this.addSvgIcon('low-vision');
    this.addSvgIcon('filter');
    this.addSvgIcon('bold');
    this.addSvgIcon('italic');
    this.addSvgIcon('underline');
  }

  private addSvgIcon(iconName: string) {
    this.matIconRegistry.addSvgIcon(
      iconName,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `./assets/vendors/fontawesome/${iconName}.svg`
      )
    );
  }
}
