import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'cse-copy-color-scheme-dialog',
  templateUrl: './copy-color-scheme-dialog.component.html',
  styleUrls: ['./copy-color-scheme-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyColorSchemeDialogComponent implements OnInit {
  jsonControl = new FormControl('', [Validators.required]);

  constructor(
    private dialogRef: MatDialogRef<CopyColorSchemeDialogComponent>
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
