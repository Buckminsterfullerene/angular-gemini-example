import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-draw-canvas',
  standalone: true,
  imports: [],
  templateUrl: './draw-canvas.component.html',
  styleUrl: './draw-canvas.component.scss'
})
export class DrawCanvasComponent {
  @Input() width = 500;
  @Input() height = 500;

  @ViewChild('canvas') private canvas: ElementRef | null = null;
}
