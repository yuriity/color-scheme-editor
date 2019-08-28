import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { CoreModule } from 'app/core/core.module';
import { SharedModule } from 'app/shared/shared.module';
import { EditorComponent } from './editor.component';
import { ReadabilityViewComponent } from './readability-view/readability-view.component';
import { ColorViewComponent } from './color-view/color-view.component';
import { EditorToolbarComponent } from './editor-toolbar/editor-toolbar.component';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditorComponent,
        ReadabilityViewComponent,
        ColorViewComponent,
        EditorToolbarComponent
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
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
