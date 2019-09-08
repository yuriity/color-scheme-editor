import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as tinycolor from 'tinycolor2';

import { AppState } from 'app/core/store/core.state';
import { TinycolorInstance } from 'app/core/models/tinycolor-instance';
import { selectSelectedTokenResource } from 'app/core/store/tokens.selectors';
import { TokenColorResource } from 'app/core/models/token-color.resource';
import { Update } from '@ngrx/entity';
import { TokenColor } from 'app/core/models/token-color';
import { updateToken } from 'app/core/store/tokens.actions';

@Component({
  selector: 'cse-edit-token-color',
  templateUrl: './edit-token-color.component.html',
  styleUrls: ['./edit-token-color.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTokenColorComponent implements OnInit {
  token$: Observable<TokenColorResource>;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.token$ = this.store.pipe(select(selectSelectedTokenResource));
  }

  onSave(token: TokenColorResource) {
    console.log('onSave', token);
    const editedToken: Update<TokenColor> = {
      id: token.id,
      changes: {
        name: token.name,
        scope: token.scope,
        color: token.color,
        fontStyle: token.getFontStyles()
      }
    };
    this.store.dispatch(updateToken({ token: editedToken }));
    this.router.navigate(['/editor']);
  }

  onCancel() {
    this.router.navigate(['/editor']);
  }
}
