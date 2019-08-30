import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import { fromEvent } from 'rxjs';
import {
  map,
  filter,
  debounceTime,
  distinctUntilChanged
} from 'rxjs/operators';

@Component({
  selector: 'cse-editor-toolbar',
  templateUrl: './editor-toolbar.component.html',
  styleUrls: ['./editor-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorToolbarComponent implements OnInit {
  @Input() title: string;
  @Output() filter = new EventEmitter<string>();
  filterValue: string;

  @ViewChild('filterInput', { static: true }) filterInput: ElementRef;

  constructor() {}

  ngOnInit() {
    fromEvent(this.filterInput.nativeElement, 'keyup')
      .pipe(
        // get value
        map((event: any) => {
          return event.target.value;
        }),
        // time in milliseconds between key events
        debounceTime(500),
        // if previous query is diffent from current
        distinctUntilChanged()
        // subscription for response
      )
      .subscribe((text: string) => {
        this.onFilter(text);
      });
  }

  onFilter(text: string) {
    this.filter.emit(text);
  }

  onClearFilterValue() {
    this.filterValue = '';
    this.onFilter('');
  }
}
