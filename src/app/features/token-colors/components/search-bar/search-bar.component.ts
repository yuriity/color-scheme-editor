import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'cse-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slideInOut', [
      state('true', style({ width: '*' })),
      state('false', style({ width: '0' })),
      transition('true => false', animate('300ms ease-in')),
      transition('false => true', animate('300ms ease-out'))
    ])
  ]
})
export class SearchBarComponent implements AfterViewInit {
  @Output() searchChanged = new EventEmitter<string>();

  @ViewChild('searchInput', { static: true }) searchInputElement: ElementRef;

  searchValue: string;
  searchVisible = false;

  constructor() {}

  ngAfterViewInit() {
    fromEvent(this.searchInputElement.nativeElement, 'keyup')
      .pipe(
        // get value
        map((event: any) => {
          return event.target.value;
        }),
        // time in milliseconds between key events
        debounceTime(300),
        // if previous query is diffent from current
        distinctUntilChanged()
        // subscription for response
      )
      .subscribe((value: string) => {
        this.onSearchChanged(value);
      });
  }

  onSearchChanged(value: string) {
    this.searchChanged.emit(value);
  }

  close(): void {
    this.searchVisible = false;
    this.searchValue = '';
    this.onSearchChanged(this.searchValue);
  }

  open(): void {
    this.searchVisible = true;
    this.searchInputElement.nativeElement.focus();
  }

  onBlurring() {
    if (!this.searchValue) {
      this.searchVisible = false;
    }
  }
}
