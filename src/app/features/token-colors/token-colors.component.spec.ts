import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { SharedModule } from 'app/shared/shared.module';
import { TokenColorsComponent } from './token-colors.component';
import { ColorViewComponent } from './components/color-view/color-view.component';
import { TokenColorsToolbarComponent } from './components/token-colors-toolbar/token-colors-toolbar.component';
import { FontStyleViewComponent } from './components/font-style-view/font-style-view.component';
import { TokenColorsTableComponent } from './components/token-colors-table/token-colors-table.component';
import { HowToComponent } from './components/how-to/how-to.component';
import * as tinycolor from 'tinycolor2';

xdescribe('TokenColorsComponent', () => {
  let component: TokenColorsComponent;
  let fixture: ComponentFixture<TokenColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TokenColorsComponent,
        ColorViewComponent,
        TokenColorsToolbarComponent,
        TokenColorsTableComponent,
        FontStyleViewComponent,
        HowToComponent
      ],
      imports: [RouterTestingModule, NoopAnimationsModule, SharedModule],
      providers: [
        provideMockStore({
          initialState: {
            ids: [],
            entities: {},
            metadata: { name: '', background: tinycolor() },
            loading: false,
            error: null
          }
        })
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
