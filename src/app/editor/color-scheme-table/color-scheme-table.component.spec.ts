import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorSchemeTableComponent } from './color-scheme-table.component';

xdescribe('ColorSchemeTableComponent', () => {
  let component: ColorSchemeTableComponent;
  let fixture: ComponentFixture<ColorSchemeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColorSchemeTableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorSchemeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
