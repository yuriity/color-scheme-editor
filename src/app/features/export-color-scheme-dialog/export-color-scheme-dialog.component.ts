import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cse-export-color-scheme-dialog',
  templateUrl: './export-color-scheme-dialog.component.html',
  styleUrls: ['./export-color-scheme-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExportColorSchemeDialogComponent implements OnInit, AfterViewInit {
  @ViewChild('jsonInput', { static: true }) jsonInputRef: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {}

  ngAfterViewInit() {
    const inputElem = this.jsonInputRef.nativeElement as HTMLInputElement;
    inputElem.select();
  }
}
