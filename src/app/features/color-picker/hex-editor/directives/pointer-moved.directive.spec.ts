import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PointerMovedDirective } from './pointer-moved.directive';

@Component({
  template: `
    <canvas (pointerMoved)="onColorPicked($event)"></canvas>
  `
})
class ColorPickedTestComponent {
  onColorPicked(event: MouseEvent) {}
}

describe('PointerMovedDirective', () => {
  let component: ColorPickedTestComponent;
  let fixture: ComponentFixture<ColorPickedTestComponent>;
  let inputEl: DebugElement;
  let colorPicked: PointerMovedDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorPickedTestComponent, PointerMovedDirective]
    });
    fixture = TestBed.createComponent(ColorPickedTestComponent);
    fixture.detectChanges();

    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('canvas'));
    colorPicked = fixture.debugElement
      .query(By.directive(PointerMovedDirective))!
      .injector.get<PointerMovedDirective>(PointerMovedDirective);
  });

  it('should create an instance', () => {
    console.log('should create an instance');
    inputEl.triggerEventHandler('mousedown', { buttons: 0, offsetX: 2, offsetY: 3 });
    fixture.detectChanges();

    expect(colorPicked).toBeTruthy();
  });
});
