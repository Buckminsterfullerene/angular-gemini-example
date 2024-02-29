import { Inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiKey = signal('');

  #isBrowser: boolean;

  /*
  Use @Inject(PLATFORM_ID) platformId: object to find out the platform the user is using.  Since this project is
  SSR, we cannot call localStorage directly because it may not be accessible.
   */
  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.#isBrowser = isPlatformBrowser(platformId);
  }

  setApiKey(key: string): void {
    this.apiKey.set(key);
  }

  getStorageKey(): string | null {
    if (this.#isBrowser) {
      return localStorage.getItem('key');
    }

    return null;
  }

  setStorageKey(key: string): void {
    if (this.#isBrowser) {
      localStorage.setItem('key', key);
    }
  }

  removeStorageKey() {
    if (this.#isBrowser) {
      localStorage.removeItem('key');
    }
  }
}
