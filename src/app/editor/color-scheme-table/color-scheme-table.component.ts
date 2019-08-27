import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { DataSource } from '@angular/cdk/table';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState, selectEditorState } from 'app/core/store/core.state';
import { TokenColor } from 'app/core/models/token-color';
import { selectAllTokenColors } from 'app/core/store/editor.reducer';

export class TokenColorsDataSource extends DataSource<any> {
  constructor(private store: Store<AppState>) {
    super();
  }
  connect(): Observable<TokenColor[]> {
    return this.store.pipe(
      select(selectEditorState),
      select(selectAllTokenColors)
    );
  }
  disconnect() {}
}

@Component({
  selector: 'cse-color-scheme-table',
  templateUrl: './color-scheme-table.component.html',
  styleUrls: ['./color-scheme-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorSchemeTableComponent implements OnInit {
  dataSource = new TokenColorsDataSource(this.store);
  displayedColumns = ['readability', 'color', 'name', 'scope'];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {}
}
