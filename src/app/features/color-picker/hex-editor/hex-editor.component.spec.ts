import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import * as tinycolor from 'tinycolor2';

import { HexEditorComponent } from './hex-editor.component';
import { PointerMovedDirective } from './directives/pointer-moved.directive';
import { AlphaEditorComponent } from './alpha-editor/alpha-editor.component';
import { HueEditorComponent } from './hue-editor/hue-editor.component';
import { SpectrumEditorComponent } from './spectrum-editor/spectrum-editor.component';
import { SharedModule } from 'app/shared/shared.module';

describe('HexEditorComponent', () => {
  let component: HexEditorComponent;
  let fixture: ComponentFixture<HexEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PointerMovedDirective,
        HexEditorComponent,
        AlphaEditorComponent,
        HueEditorComponent,
        SpectrumEditorComponent
      ],
      imports: [SharedModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HexEditorComponent);
    component = fixture.componentInstance;
    component.color = tinycolor({ r: 0, g: 0, b: 0 });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
