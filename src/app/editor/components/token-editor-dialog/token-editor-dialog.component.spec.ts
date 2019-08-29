import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenEditorDialogComponent } from './token-editor-dialog.component';
import { SharedModule } from 'app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('TokenEditorDialogComponent', () => {
  let component: TokenEditorDialogComponent;
  let fixture: ComponentFixture<TokenEditorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TokenEditorDialogComponent],
      imports: [SharedModule, NoopAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenEditorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
