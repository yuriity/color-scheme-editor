import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { PickColorDirective } from './pick-color.directive';

@Component({
  template: `
    <canvas csePickColor (colorPicked)="onColorPicked($event)"></canvas>
  `
})
class ColorPickedTestComponent {
  onColorPicked(event: MouseEvent) {}
}

describe('PickColorDirective', () => {
  let component: ColorPickedTestComponent;
  let fixture: ComponentFixture<ColorPickedTestComponent>;
  let inputEl: DebugElement;
  let colorPicked: PickColorDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorPickedTestComponent, PickColorDirective]
    });
    fixture = TestBed.createComponent(ColorPickedTestComponent);
    fixture.detectChanges();

    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('canvas'));
    colorPicked = fixture.debugElement
      .query(By.directive(PickColorDirective))!
      .injector.get<PickColorDirective>(PickColorDirective);
  });

  it('should create an instance', () => {
    console.log('should create an instance');
    inputEl.triggerEventHandler('mousedown', { buttons: 0, offsetX: 2, offsetY: 3 });
    fixture.detectChanges();

    expect(colorPicked).toBeTruthy();
  });
});
