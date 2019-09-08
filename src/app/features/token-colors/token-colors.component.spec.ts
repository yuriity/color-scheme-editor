import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreModule } from 'app/core/core.module';
import { SharedModule } from 'app/shared/shared.module';
import { TokenColorsComponent } from './token-colors.component';
import { ColorViewComponent } from './components/color-view/color-view.component';
import { TokenColorsToolbarComponent } from './components/token-colors-toolbar/token-colors-toolbar.component';
import { FontStyleViewComponent } from './components/font-style-view/font-style-view.component';

describe('TokenColorsComponent', () => {
  let component: TokenColorsComponent;
  let fixture: ComponentFixture<TokenColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TokenColorsComponent,
        ColorViewComponent,
        TokenColorsToolbarComponent,
        FontStyleViewComponent
      ],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        SharedModule,
        CoreModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
