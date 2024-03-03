import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  showFileInput = signal(false);
  showDrawingCanvas = signal(false);
}
