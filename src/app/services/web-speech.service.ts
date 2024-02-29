import { Injectable } from '@angular/core';
import { ILanguage } from '../interfaces/i-language';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class WebSpeechService {
  isWebSpeechAvailable = ('webkitSpeechRecognition' in window);

  start(lang = navigator.language): Promise<string> {
    const recognition = new webkitSpeechRecognition();
    // The default value for continuous is false, meaning that when the user stops talking, speech recognition will end.
    // This mode is great for simple text like short input fields.
    recognition.continuous = false;
    // The default value for interimResults is false, meaning that the only results returned by the recognizer are final
    // and will not change.
    recognition.interimResults = false;
    recognition.lang = lang;
    recognition.start();

    return new Promise((resolve, reject) => {
      recognition.onresult = (event: any) => {
        resolve(event.results[0][0].transcript);
        recognition.abort();
      };

      recognition.onerror = reject;
    });
  }

  readonly languages: ILanguage[] = [
    {
      label: 'Afrikaans',
      lang: 'af-ZA',
      country: ''
    },
    {
      label: 'Bahasa Indonesia',
      lang: 'id-ID',
      country: ''
    },
    {
      label: 'Bahasa Melayu',
      lang: 'ms-MY',
      country: ''
    },
    {
      label: 'Català',
      lang: 'ca-ES',
      country: ''
    },
    {
      label: 'Čeština',
      lang: 'cs-CZ',
      country: ''
    },
    {
      label: 'Deutsch',
      lang: 'de-DE',
      country: ''
    },
    {
      label: 'English',
      lang: 'en-AU',
      country: 'Australia'
    },
    {
      label: 'English',
      lang: 'en-CA',
      country: 'Canada'
    },
    {
      label: 'English',
      lang: 'en-IN',
      country: 'India'
    },
    {
      label: 'English',
      lang: 'en-NZ',
      country: 'New Zealand'
    },
    {
      label: 'English',
      lang: 'en-ZA',
      country: 'South Africa'
    },
    {
      label: 'English',
      lang: 'en-GB',
      country: 'United Kingdom'
    },
    {
      label: 'English',
      lang: 'en-US',
      country: 'United States'
    },
    {
      label: 'Español',
      lang: 'es-AR',
      country: 'Argentina'
    },
    {
      label: 'Español',
      lang: 'es-BO',
      country: 'Bolivia'
    },
    {
      label: 'Español',
      lang: 'es-CL',
      country: 'Chile'
    },
    {
      label: 'Español',
      lang: 'es-CO',
      country: 'Colombia'
    },
    {
      label: 'Español',
      lang: 'es-CR',
      country: 'Costa Rica'
    },
    {
      label: 'Español',
      lang: 'es-EC',
      country: 'Ecuador'
    },
    {
      label: 'Español',
      lang: 'es-SV',
      country: 'El Salvador'
    },
    {
      label: 'Español',
      lang: 'es-ES',
      country: 'España'
    },
    {
      label: 'Español',
      lang: 'es-US',
      country: 'Estados Unidos'
    },
    {
      label: 'Español',
      lang: 'es-GT',
      country: 'Guatemala'
    },
    {
      label: 'Español',
      lang: 'es-HN',
      country: 'Honduras'
    },
    {
      label: 'Español',
      lang: 'es-MX',
      country: 'México'
    },
    {
      label: 'Español',
      lang: 'es-NI',
      country: 'Nicaragua'
    },
    {
      label: 'Español',
      lang: 'es-PA',
      country: 'Panamá'
    },
    {
      label: 'Español',
      lang: 'es-PY',
      country: 'Paraguay'
    },
    {
      label: 'Español',
      lang: 'es-PE',
      country: 'Perú'
    },
    {
      label: 'Español',
      lang: 'es-PR',
      country: 'Puerto Rico'
    },
    {
      label: 'Español',
      lang: 'es-DO',
      country: 'República Dominicana'
    },
    {
      label: 'Español',
      lang: 'es-UY',
      country: 'Uruguay'
    },
    {
      label: 'Español',
      lang: 'es-VE',
      country: 'Venezuela'
    },
    {
      label: 'Euskara',
      lang: 'eu-ES',
      country: ''
    },
    {
      label: 'Français',
      lang: 'fr-FR',
      country: ''
    },
    {
      label: 'Galego',
      lang: 'gl-ES',
      country: ''
    },
    {
      label: 'Hrvatski',
      lang: 'hr_HR',
      country: ''
    },
    {
      label: 'IsiZulu',
      lang: 'zu-ZA',
      country: ''
    },
    {
      label: 'Íslenska',
      lang: 'is-IS',
      country: ''
    },
    {
      label: 'Italiano',
      lang: 'it-IT',
      country: 'Italia'
    },
    {
      label: 'Italiano',
      lang: 'it-CH',
      country: 'Svizzera'
    },
    {
      label: 'Magyar',
      lang: 'hu-HU',
      country: ''
    },
    {
      label: 'Nederlands',
      lang: 'nl-NL',
      country: ''
    },
    {
      label: 'Norsk bokmål',
      lang: 'nb-NO',
      country: ''
    },
    {
      label: 'Polski',
      lang: 'pl-PL',
      country: ''
    },
    {
      label: 'Português',
      lang: 'pt-BR',
      country: 'Brasil'
    },
    {
      label: 'Português',
      lang: 'pt-PT',
      country: 'Portugal'
    },
    {
      label: 'Română',
      lang: 'ro-RO',
      country: ''
    },
    {
      label: 'Slovenčina',
      lang: 'sk-SK',
      country: ''
    },
    {
      label: 'Suomi',
      lang: 'fi-FI',
      country: ''
    },
    {
      label: 'Svenska',
      lang: 'sv-SE',
      country: ''
    },
    {
      label: 'Türkçe',
      lang: 'tr-TR',
      country: ''
    },
    {
      label: 'български',
      lang: 'bg-BG',
      country: ''
    },
    {
      label: 'Pусский',
      lang: 'ru-RU',
      country: ''
    },
    {
      label: 'Српски',
      lang: 'sr-RS',
      country: ''
    },
    {
      label: '한국어',
      lang: 'ko-KR',
      country: ''
    },
    {
      label: '中文',
      lang: 'cmn-Hans-CN',
      country: '普通话 (中国大陆)'
    },
    {
      label: '中文',
      lang: 'cmn-Hans-HK',
      country: '普通话 (香港)'
    },
    {
      label: '中文',
      lang: 'cmn-Hant-TW',
      country: '中文 (台灣)'
    },
    {
      label: '中文',
      lang: 'yue-Hant-HK',
      country: '粵語 (香港)'
    },
    {
      label: '日本語',
      lang: 'ja-JP',
      country: ''
    },
    {
      label: 'Lingua latīna',
      lang: 'la',
      country: ''
    },
  ];
}
