import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { TinycolorInstance } from 'app/core/models/tinycolor-instance';

@Component({
  selector: 'cse-token-editor-dialog',
  templateUrl: './token-editor-dialog.component.html',
  styleUrls: ['./token-editor-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokenEditorDialogComponent implements OnInit {
  name: string;
  scope: string;
  color: TinycolorInstance;
  fontStyleBold: boolean;
  fontStyleItalic: boolean;
  fontStyleUnderline: boolean;
  readability: number;

  constructor(
    private dialogRef: MatDialogRef<TokenEditorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data);
  }

  ngOnInit() {}

  onSave() {
    this.dialogRef.close();
  }

  onCancel() {
    this.dialogRef.close();
  }
}
