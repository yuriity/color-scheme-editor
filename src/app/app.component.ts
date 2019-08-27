import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { EditorState } from './core/store/editor.state';
import { actionEditorLoad } from './core/store/editor.actions';

@Component({
  selector: 'cse-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'color-scheme-editor';

  constructor(private store: Store<EditorState>) {}

  loadFile(file: File) {
    this.store.dispatch(actionEditorLoad({ file }));
  }
}
