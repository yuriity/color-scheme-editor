import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from './core/store/core.state';
import { loadTokens } from './core/store/tokens.actions';
import { selectTokensLoading } from './core/store/tokens.selectors';

@Component({
  selector: 'cse-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tokensLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.tokensLoading$ = this.store.pipe(select(selectTokensLoading));
  }

  loadFile(file: File) {
    this.store.dispatch(loadTokens({ file }));
  }
}
