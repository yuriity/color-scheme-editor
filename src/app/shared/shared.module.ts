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
    this.addSvgIcon('undo');
    this.addSvgIcon('folder-open');
    this.addSvgIcon('file-upload');
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
