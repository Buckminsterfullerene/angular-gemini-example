import { afterNextRender, Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerativeModel } from '@google/generative-ai';
import { GeminiService } from '../../services/gemini.service';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { formatStringToHtml } from '../../utility/format-string-to-html';
import { ResponseComponent } from './response/response.component';
import { WebSpeechService } from '../../services/web-speech.service';
import { ILanguage } from '../../interfaces/i-language';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-ask-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ResponseComponent,
  ],
  templateUrl: './ask-form.component.html',
  styleUrl: './ask-form.component.scss'
})
export class AskFormComponent {
  askForm: FormGroup;
  generativeResponse? = '';
  languages: ILanguage[];
  isSpeechAvailable: boolean;
  micColor = signal('');
  disableAskButton = signal(false);
  isLoading = signal(false);
  isSpeechActive = signal(false);

  #formBuilder = inject(FormBuilder);
  #geminiService = inject(GeminiService);
  #webSpeechService = inject(WebSpeechService);
  #generativeModel: GenerativeModel | null = null;

  constructor() {
    // Get the browser's default language
    const browserLang = navigator.language;

    this.askForm = this.#formBuilder.group({
      ask: new FormControl('', [ Validators.required ]),
      language: new FormControl(browserLang)
    });

    this.languages = this.#webSpeechService.languages;
    this.isSpeechAvailable = this.#webSpeechService.isWebSpeechAvailable;

    afterNextRender(() => {
      this.#generativeModel = this.#geminiService.getGenerativeModel();
    });
  }

  async submitQuestion() {
    this.isLoading.set(true);
    this.disableAskButton.set(true);
    if (this.askForm.invalid) {
      this.isLoading.set(false);
      return;
    }

    try {
      const result = await this.#generativeModel?.generateContent([
        this.askForm.value['ask'].trim()
      ]);
      const response = result?.response;
      if (response?.text()) {
        this.generativeResponse = formatStringToHtml(response?.text());
      } else {
        this.generativeResponse = 'NO RESPONSE';
      }

      this.disableAskButton.set(false);
      this.isLoading.set(false);
    } catch (e) {
      console.error(e);
      this.disableAskButton.set(false);
      this.isLoading.set(false);
    }
  }

  async speechToText() {
    this.isSpeechActive.set(true);
    this.micColor.set('accent');
    const inputSpeech = await this.#webSpeechService.start(this.askForm.get('language')?.value);

    // Clear input
    this.askForm.get('ask')?.setValue('');
    this.askForm.get('ask')?.setValue(inputSpeech);

    this.isSpeechActive.set(false);
    this.micColor.set('');
  }
}
