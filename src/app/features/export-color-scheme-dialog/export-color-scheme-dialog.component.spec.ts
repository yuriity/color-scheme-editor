import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef } from '@angular/material';

import { SharedModule } from 'app/shared/shared.module';
import { ExportColorSchemeDialogComponent } from './export-color-scheme-dialog.component';

describe('ExportColorSchemeDialogComponent', () => {
  let component: ExportColorSchemeDialogComponent;
  let fixture: ComponentFixture<ExportColorSchemeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExportColorSchemeDialogComponent],
      imports: [SharedModule, NoopAnimationsModule],
      providers: [{ provide: MatDialogRef, useValue: {} }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportColorSchemeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
