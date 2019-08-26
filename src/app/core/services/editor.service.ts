import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

import { ColorScheme } from '../models/color-scheme';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  constructor() {}

  loadColorScheme(file: File): Observable<ColorScheme> {
    const reader = new FileReader();
    const fileReader$ = fromEvent<any>(reader, 'load').pipe(
      map(event => ColorScheme.fromJson(event.target.result))
    );

    reader.readAsText(file);

    return fileReader$;
  }
}
