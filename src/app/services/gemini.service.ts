import { inject, Injectable } from '@angular/core';
import { GenerativeModel, GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';
import { ISafetySettings } from '../interfaces/i-safety-settings';
import { ApiService } from './api.service';
import { GenerativeModelType } from '../enums/global';


@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  // NOTE: The default is BLOCK_MEDIUM_AND_ABOVE for all types.  This is here just to show how to use it.
  #safetySettings: ISafetySettings[] = [
    {
      category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  #apiService = inject(ApiService);

  getGenerativeModel(modelType: GenerativeModelType): GenerativeModel {
    const api = new GoogleGenerativeAI(
       this.#apiService.apiKey().toString()
    );

    return api.getGenerativeModel({
      model: modelType
      // safetySettings: this.#safetySettings
    });
  }
}
