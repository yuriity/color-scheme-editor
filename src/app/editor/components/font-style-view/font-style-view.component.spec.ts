import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontStyleViewComponent } from './font-style-view.component';

describe('FontStyleViewComponent', () => {
  let component: FontStyleViewComponent;
  let fixture: ComponentFixture<FontStyleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontStyleViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontStyleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
