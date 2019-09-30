import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from 'app/shared/shared.module';
import { TokenColorsListComponent } from './token-colors-list.component';
import { ColorViewComponent } from '../color-view/color-view.component';
import { FontStyleViewComponent } from '../font-style-view/font-style-view.component';

describe('TokenColorsListComponent', () => {
  let component: TokenColorsListComponent;
  let fixture: ComponentFixture<TokenColorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TokenColorsListComponent,
        ColorViewComponent,
        FontStyleViewComponent
      ],
      imports: [NoopAnimationsModule, SharedModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenColorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
