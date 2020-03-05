import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ReadabilityViewCompactComponent } from './readability-view-compact.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ReadabilityViewCompactComponent', () => {
  let component: ReadabilityViewCompactComponent;
  let fixture: ComponentFixture<ReadabilityViewCompactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReadabilityViewCompactComponent],
      imports: [NoopAnimationsModule, MatIconModule, MatTooltipModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadabilityViewCompactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
