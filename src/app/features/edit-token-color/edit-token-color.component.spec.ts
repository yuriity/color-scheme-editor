import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTokenColorComponent } from './edit-token-color.component';

describe('EditTokenColorComponent', () => {
  let component: EditTokenColorComponent;
  let fixture: ComponentFixture<EditTokenColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTokenColorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTokenColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
