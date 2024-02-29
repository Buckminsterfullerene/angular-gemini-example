import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable({
  providedIn: 'root'
})
export class KeyGuard {
  #router  = inject(Router);
  #apiService = inject(ApiService);

  constructor() {
  }

  canActivate(): boolean {
    if (this.#apiService.apiKey() !== '') {
      return true;
    } else {
      this.#router.navigateByUrl('/enter');
      return false;
    }
  }
}
