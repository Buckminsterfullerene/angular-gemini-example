import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AskFormComponent } from './pages/ask-form/ask-form.component';
import { ApiService } from './services/api.service';
import { ApiKeyFormComponent } from './pages/api-key-form/api-key-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LayoutUiComponent } from './layout-ui/layout-ui.component';
import { RouterOutlet } from '@angular/router';
import { SpinnerService } from './shared/spinner/spinner.service';
import { SpinnerComponent } from './shared/spinner/spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    AskFormComponent,
    ApiKeyFormComponent,
    MatProgressSpinnerModule,
    LayoutUiComponent,
    RouterOutlet,
    SpinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular Gemini Example';
  apiKey = signal('');
  spinnerService = inject(SpinnerService);

  #apiService = inject(ApiService);

  constructor() {
    const storageKey = this.#apiService.getStorageKey();

    if (storageKey) {
      this.#apiService.apiKey.set(storageKey);
    }

    this.apiKey.set(this.#apiService.apiKey());
  }
}
