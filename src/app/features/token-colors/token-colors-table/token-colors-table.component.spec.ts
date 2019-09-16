import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenColorsTableComponent } from './token-colors-table.component';

describe('TokenColorsTableComponent', () => {
  let component: TokenColorsTableComponent;
  let fixture: ComponentFixture<TokenColorsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenColorsTableComponent ]
    })
    .compileComponents();
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
