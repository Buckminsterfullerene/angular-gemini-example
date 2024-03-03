import { Component, inject, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GenerateContentResult, GenerativeModel } from '@google/generative-ai';
import { GeminiService } from '../../services/gemini.service';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { formatStringToHtml } from '../../utility/format-string-to-html';
import { ResponseComponent } from './response/response.component';
import { WebSpeechService } from '../../services/web-speech.service';
import { ILanguage } from '../../interfaces/i-language';
import { MatSelectModule } from '@angular/material/select';
import { GenerativeModelType } from '../../enums/global';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { MenuService } from '../../services/menu.service';

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
    FileUploadComponent,
  ],
  templateUrl: './ask-form.component.html',
  styleUrl: './ask-form.component.scss'
})
export class AskFormComponent {
  askForm: FormGroup;
  generativeResponse? = '';
  languages: ILanguage[];
  isSpeechAvailable: boolean;
  files: File[] = [];
  micColor = signal('');
  disableAskButton = signal(false);
  isLoading = signal(false);
  isSpeechActive = signal(false);
  menuService = inject(MenuService);

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
  }

  async submitQuestion() {
    this.isLoading.set(true);
    this.disableAskButton.set(true);
    if (this.askForm.invalid) {
      this.isLoading.set(false);
      return;
    }

    try {
      let result: GenerateContentResult;

      if (this.menuService.showFileInput() && this.files.length > 0) {
        this.#generativeModel = this.#geminiService.getGenerativeModel(GenerativeModelType.geminiProVision);
        // const fileInputEl = document.querySelector("input[type=file]");
        if (this.menuService.showFileInput()) {
          const imageParts = await Promise.all(
            // @ts-ignore
            // [ ...fileInputEl!.files ].map(this.fileToGenerativePart)
            [ ...this.files ].map(this.#fileToGenerativePart)
          );

          result = await this.#generativeModel?.generateContent([
            this.askForm.value['ask'].trim(), ...imageParts
          ]);
          const response = result?.response;
          if (response?.text()) {
            this.generativeResponse = formatStringToHtml(response?.text());
          } else {
            this.generativeResponse = 'NO RESPONSE';
          }
        }
      } else {
        this.#generativeModel = this.#geminiService.getGenerativeModel(GenerativeModelType.geminiPro);
        result = await this.#generativeModel?.generateContent([
          this.askForm.value['ask'].trim()
        ]);
        const response = result?.response;
        if (response?.text()) {
          this.generativeResponse = formatStringToHtml(response?.text());
        } else {
          this.generativeResponse = 'NO RESPONSE';
        }
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

  manageFiles(files: File[]) {
    this.files = files;
  }

  // Converts a File object to a GoogleGenerativeAI.Part object.
  async #fileToGenerativePart(file: any) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      // @ts-ignore
      reader.onloadend = () => resolve(reader.result!.split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  }

}
