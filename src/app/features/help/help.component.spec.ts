import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpComponent } from './help.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'app/shared/shared.module';

describe('HelpComponent', () => {
  let component: HelpComponent;
  let fixture: ComponentFixture<HelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HelpComponent],
      imports: [NoopAnimationsModule, SharedModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
