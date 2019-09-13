import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportColorSchemeDialogComponent } from './export-color-scheme-dialog.component';

describe('ExportColorSchemeDialogComponent', () => {
  let component: ExportColorSchemeDialogComponent;
  let fixture: ComponentFixture<ExportColorSchemeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportColorSchemeDialogComponent ]
    })
    .compileComponents();
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
