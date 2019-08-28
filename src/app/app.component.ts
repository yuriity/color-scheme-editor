import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, selectEditorState } from './core/store/core.state';
import { actionEditorLoad } from './core/store/editor.actions';
import { EditorState } from './core/store/editor.reducer';

@Component({
  selector: 'cse-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  editorState$: Observable<EditorState>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.editorState$ = this.store.pipe(select(selectEditorState));
  }

  loadFile(file: File) {
    this.store.dispatch(actionEditorLoad({ file }));
  }
}
