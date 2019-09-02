import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularResizedEventModule } from 'angular-resize-event';

import { SharedModule } from 'app/shared/shared.module';
import { SpectrumEditorComponent } from './spectrum-editor.component';

describe('SpectrumEditorComponent', () => {
  let component: SpectrumEditorComponent;
  let fixture: ComponentFixture<SpectrumEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpectrumEditorComponent],
      imports: [SharedModule, AngularResizedEventModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpectrumEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
