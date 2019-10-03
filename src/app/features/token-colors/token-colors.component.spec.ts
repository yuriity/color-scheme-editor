import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import * as tinycolor from 'tinycolor2';

import { SharedModule } from 'app/shared/shared.module';
import { TokenColorsComponent } from './token-colors.component';
import { ColorViewComponent } from './components/color-view/color-view.component';
import { FontStyleViewComponent } from './components/font-style-view/font-style-view.component';
import { HowToComponent } from './components/how-to/how-to.component';
import { SortByComponent } from './components/sort-by/sort-by.component';
import { TokenColorsListComponent } from './components/token-colors-list/token-colors-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

xdescribe('TokenColorsComponent', () => {
  let component: TokenColorsComponent;
  let fixture: ComponentFixture<TokenColorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TokenColorsListComponent,
        SortByComponent,
        SearchBarComponent,
        TokenColorsComponent,
        ColorViewComponent,
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
