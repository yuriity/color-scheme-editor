import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import * as tinycolor from 'tinycolor2';

import { SharedModule } from 'app/shared/shared.module';
import { ColorPickerModule } from '../color-picker/color-picker.module';
import { EditTokenColorComponent } from './edit-token-color.component';
import { PreviewComponent } from './preview/preview.component';

xdescribe('EditTokenColorComponent', () => {
  let component: EditTokenColorComponent;
  let fixture: ComponentFixture<EditTokenColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditTokenColorComponent, PreviewComponent],
      imports: [NoopAnimationsModule, SharedModule, ColorPickerModule],
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
    fixture = TestBed.createComponent(EditTokenColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
