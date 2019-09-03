import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadabilityViewComponent } from './readability-view.component';

describe('ReadabilityViewComponent', () => {
  let component: ReadabilityViewComponent;
  let fixture: ComponentFixture<ReadabilityViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadabilityViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadabilityViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
