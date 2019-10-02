import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from 'app/core/store/core.state';
import {
  selectColorScheme,
  selectTokensLoading
} from 'app/core/store/tokens/tokens.selectors';
import { Update } from '@ngrx/entity';
import { TokenColor } from 'app/core/models/token-color';
import { updateToken } from 'app/core/store/tokens/tokens.actions';
import { ColorSchemeResource } from 'app/core/models/color-scheme.resource';
import { TokenColorSort } from './components/token-colors-list/token-colors-list.component';

@Component({
  selector: 'cse-token-colors',
  templateUrl: './token-colors.component.html',
  styleUrls: ['./token-colors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokenColorsComponent implements OnInit {
  tokensLoading$: Observable<boolean>;
  colorScheme$: Observable<ColorSchemeResource>;
  tokensSort: TokenColorSort = null;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.tokensLoading$ = this.store.pipe(select(selectTokensLoading));
    this.colorScheme$ = this.store.pipe(select(selectColorScheme));
  }

  resetToOriginal(tokenId: number) {
    const editedToken: Update<TokenColor> = {
      id: tokenId,
      changes: {
        name: null,
        scope: null,
        color: null,
        fontStyle: null
      }
    };
    this.store.dispatch(updateToken({ token: editedToken }));
  }
}
