import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ColorScheme } from 'app/core/models/color-scheme';
import { EditorState } from 'app/core/store/editor.state';

@Component({
  selector: 'cse-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit {
  editorState$: Observable<ColorScheme>;

  constructor(private store: Store<EditorState>) {}

  ngOnInit() {
    this.editorState$ = this.store.pipe(select('editorState'));
  }
}
