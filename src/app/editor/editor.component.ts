import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, selectEditorState } from 'app/core/store/core.state';
import { EditorState } from 'app/core/store/editor.reducer';

@Component({
  selector: 'cse-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit {
  editorState$: Observable<EditorState>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.editorState$ = this.store.pipe(select(selectEditorState));
  }
}
