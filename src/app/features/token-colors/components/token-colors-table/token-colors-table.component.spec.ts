import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from 'app/shared/shared.module';
import { TokenColorsTableComponent } from './token-colors-table.component';
import { TokenColorsToolbarComponent } from '../token-colors-toolbar/token-colors-toolbar.component';
import { ColorViewComponent } from '../color-view/color-view.component';
import { FontStyleViewComponent } from '../font-style-view/font-style-view.component';

describe('TokenColorsTableComponent', () => {
  let component: TokenColorsTableComponent;
  let fixture: ComponentFixture<TokenColorsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ColorViewComponent,
        TokenColorsToolbarComponent,
        TokenColorsTableComponent,
        FontStyleViewComponent
      ],
      imports: [NoopAnimationsModule, SharedModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenColorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
