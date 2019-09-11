import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'cse-parse-color-scheme-dialog',
  templateUrl: './parse-color-scheme-dialog.component.html',
  styleUrls: ['./parse-color-scheme-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParseColorSchemeDialogComponent implements OnInit {
  jsonControl = new FormControl('', [Validators.required]);

  constructor(
    private dialogRef: MatDialogRef<ParseColorSchemeDialogComponent>
  ) {}

  ngOnInit() {}

  getErrorMessage() {
    if (this.jsonControl.hasError('required')) {
      return 'You must enter a value';
    }

    const jsonError = this.jsonControl.getError('validateJson');
    return jsonError ? jsonError.message : '';
  }

  onGenerate() {
    this.dialogRef.close(this.jsonControl.value);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
