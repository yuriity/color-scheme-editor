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
  MatSnackBarModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule
} from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

import { ReadabilityViewCompactComponent } from './components/readability-view/readability-view-compact.component';
import { ReadabilityViewComponent } from './components/readability-view/readability-view.component';
import { JsonValidatorDirective } from './directives/json-validator.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ReadabilityViewCompactComponent, ReadabilityViewComponent, JsonValidatorDirective],
  imports: [
    CommonModule,
    RouterModule,
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
    MatSnackBarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule
  ],
  exports: [
    CommonModule,
    RouterModule,
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
    MatSidenavModule,
    MatListModule,
    MatDividerModule,

    ReadabilityViewCompactComponent,
    ReadabilityViewComponent,
    JsonValidatorDirective
  ]
})
export class SharedModule {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon(
      'app-logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(`./assets/images/app-logo.svg`)
    );
    this.matIconRegistry.addSvgIcon(
      'app-logo-filled',
      this.domSanitizer.bypassSecurityTrustResourceUrl(`./assets/images/app-logo-filled.svg`)
    );
    this.addFontawesomeIcon('caret-down');
    this.addFontawesomeIcon('bars');
    this.addFontawesomeIcon('undo');
    this.addFontawesomeIcon('folder-open');
    this.addFontawesomeIcon('file-upload');
    this.addFontawesomeIcon('file-export');
    this.addFontawesomeIcon('eye');
    this.addFontawesomeIcon('eye-slash');
    this.addFontawesomeIcon('low-vision');
    this.addFontawesomeIcon('filter');
    this.addFontawesomeIcon('bold');
    this.addFontawesomeIcon('italic');
    this.addFontawesomeIcon('underline');
    this.addFontawesomeIcon('palette');
    this.addFontawesomeIcon('github');
    this.addFontawesomeIcon('question-circle');
    this.addFontawesomeIcon('pencil-alt');
    this.addFontawesomeIcon('sort-alpha-down-alt');
    this.addFontawesomeIcon('sort-alpha-up-alt');
    this.addFontawesomeIcon('sort-amount-down-alt');
    this.addFontawesomeIcon('sort-amount-up-alt');
    this.addFontawesomeIcon('sort-numeric-down-alt');
    this.addFontawesomeIcon('sort-numeric-up-alt');
    this.addFontawesomeIcon('long-arrow-alt-down');
    this.addFontawesomeIcon('long-arrow-alt-up');
    this.addFontawesomeIcon('search');
    this.addFontawesomeIcon('times');
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
