import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { FontStyleViewComponent } from './font-style-view.component';
import { SharedModule } from 'app/shared/shared.module';

describe('FontStyleViewComponent', () => {
  let component: FontStyleViewComponent;
  let fixture: ComponentFixture<FontStyleViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FontStyleViewComponent],
      imports: [NoopAnimationsModule, SharedModule]
    }).compileComponents();
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
