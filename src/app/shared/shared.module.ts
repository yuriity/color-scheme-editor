import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
  MatDialogModule,
  MatCheckboxModule,
  MatTabsModule,
  MatSliderModule,
  MatBadgeModule,
  MatSnackBarModule
} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { ReadabilityViewCompactComponent } from './components/readability-view/readability-view-compact.component';
import { ReadabilityViewComponent } from './components/readability-view/readability-view.component';
import { JsonValidatorDirective } from './directives/json-validator.directive';

@NgModule({
  declarations: [
    ReadabilityViewCompactComponent,
    ReadabilityViewComponent,
    JsonValidatorDirective
  ],
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
    MatDialogModule,
    MatCheckboxModule,
    MatTabsModule,
    MatSliderModule,
    MatBadgeModule,
    MatSnackBarModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

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
    MatCheckboxModule,
    MatTabsModule,
    MatSliderModule,
    MatBadgeModule,
    MatSnackBarModule,

    ReadabilityViewCompactComponent,
    ReadabilityViewComponent,
    JsonValidatorDirective
  ]
})
export class SharedModule {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'color-scheme-editor-logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `./assets/images/color-scheme-editor-logo.svg`
      )
    );
    this.addFontawesomeIcon('undo');
    this.addFontawesomeIcon('folder-open');
    this.addFontawesomeIcon('file-upload');
    this.addFontawesomeIcon('file-export');
    this.addFontawesomeIcon('code');
    this.addFontawesomeIcon('eye');
    this.addFontawesomeIcon('eye-slash');
    this.addFontawesomeIcon('low-vision');
    this.addFontawesomeIcon('filter');
    this.addFontawesomeIcon('bold');
    this.addFontawesomeIcon('italic');
    this.addFontawesomeIcon('underline');
    this.addFontawesomeIcon('palette');
    this.addFontawesomeIcon('github');
  }

  private addFontawesomeIcon(iconName: string) {
    this.matIconRegistry.addSvgIcon(
      iconName,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `./assets/vendors/fontawesome/${iconName}.svg`
      )
    );
  }
}
