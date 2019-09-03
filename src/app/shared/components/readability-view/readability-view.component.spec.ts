import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatTooltipModule } from '@angular/material';

import { ReadabilityViewComponent } from './readability-view.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ReadabilityViewComponent', () => {
  let component: ReadabilityViewComponent;
  let fixture: ComponentFixture<ReadabilityViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadabilityViewComponent],
      imports: [NoopAnimationsModule, MatIconModule, MatTooltipModule]
    }).compileComponents();
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
