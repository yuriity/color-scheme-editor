import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef } from '@angular/material/dialog';

import { SharedModule } from 'app/shared/shared.module';
import { ParseColorSchemeDialogComponent } from './parse-color-scheme-dialog.component';

describe('ParseColorSchemeDialogComponent', () => {
  let component: ParseColorSchemeDialogComponent;
  let fixture: ComponentFixture<ParseColorSchemeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ParseColorSchemeDialogComponent],
      imports: [SharedModule, NoopAnimationsModule],
      providers: [{ provide: MatDialogRef, useValue: {} }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParseColorSchemeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
