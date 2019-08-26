import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'cse-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Output() openFileEvent = new EventEmitter<File>();

  constructor() {}

  ngOnInit() {}

  openLocalFile(file: File) {
    this.openFileEvent.emit(file);
  }
}
