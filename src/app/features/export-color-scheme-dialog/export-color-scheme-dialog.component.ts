import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'cse-export-color-scheme-dialog',
  templateUrl: './export-color-scheme-dialog.component.html',
  styleUrls: ['./export-color-scheme-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportColorSchemeDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}
}
