import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from 'app/shared/shared.module';
import { CopyColorSchemeDialogComponent } from './copy-color-scheme-dialog.component';
import { MatDialogRef } from '@angular/material';

describe('CopyColorSchemeDialogComponent', () => {
  let component: CopyColorSchemeDialogComponent;
  let fixture: ComponentFixture<CopyColorSchemeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CopyColorSchemeDialogComponent],
      imports: [SharedModule, NoopAnimationsModule],
      providers: [{ provide: MatDialogRef, useValue: {} }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyColorSchemeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
