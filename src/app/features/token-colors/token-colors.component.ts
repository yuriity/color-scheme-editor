import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { AppState } from 'app/core/store/core.state';
import { selectColorScheme } from 'app/core/store/tokens/tokens.selectors';
import { Update } from '@ngrx/entity';
import { TokenColor } from 'app/core/models/token-color';
import { updateToken } from 'app/core/store/tokens/tokens.actions';
import { ColorSchemeResource } from 'app/core/models/color-scheme.resource';

@Component({
  selector: 'cse-token-colors',
  templateUrl: './token-colors.component.html',
  styleUrls: ['./token-colors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokenColorsComponent implements OnInit {
  colorScheme$: Observable<ColorSchemeResource>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private store: Store<AppState>, private cd: ChangeDetectorRef) {}

  ngOnInit() {
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
