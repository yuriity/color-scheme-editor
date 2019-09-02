import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';

import * as tinycolor from 'tinycolor2';

import { ColorPickerComponent } from './color-picker.component';
import { HexEditorComponent } from './hex-editor/hex-editor.component';
import { PickColorDirective } from './hex-editor/pick-color.directive';
import { AlphaEditorComponent } from './hex-editor/alpha-editor/alpha-editor.component';
import { HueEditorComponent } from './hex-editor/hue-editor/hue-editor.component';
import { SpectrumEditorComponent } from './hex-editor/spectrum-editor/spectrum-editor.component';
import { SharedModule } from 'app/shared/shared.module';
import { AngularResizedEventModule } from 'angular-resize-event';

describe('ColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, SharedModule, AngularResizedEventModule],
      declarations: [
        PickColorDirective,
        ColorPickerComponent,
        HexEditorComponent,
        AlphaEditorComponent,
        HueEditorComponent,
        SpectrumEditorComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
    component.color = tinycolor({ r: 0, g: 0, b: 0 });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
