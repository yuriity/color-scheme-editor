import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from 'app/shared/shared.module';
import { HueEditorComponent } from './hue-editor.component';

describe('HueEditorComponent', () => {
  let component: HueEditorComponent;
  let fixture: ComponentFixture<HueEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HueEditorComponent],
      imports: [SharedModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HueEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
