import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { EditorState, actionEditorLoad } from '@app/core';

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
