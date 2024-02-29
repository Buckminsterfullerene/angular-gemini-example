import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-response',
  standalone: true,
  imports: [],
  templateUrl: './response.component.html',
  styleUrl: './response.component.scss',
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ResponseComponent {
  @Input() generativeResponse!: any;
}
