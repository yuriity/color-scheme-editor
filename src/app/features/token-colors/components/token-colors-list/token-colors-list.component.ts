import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { TokenColorResource } from 'app/core/models/token-color.resource';

@Component({
  selector: 'cse-token-colors-list',
  templateUrl: './token-colors-list.component.html',
  styleUrls: ['./token-colors-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokenColorsListComponent implements OnInit {
  @Input() tokens: TokenColorResource[];

  @Output() resetItemEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  resetToOriginal(tokenId: number) {
    this.resetItemEvent.emit(tokenId);
  }

}
