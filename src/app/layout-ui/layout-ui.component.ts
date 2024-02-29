import { ChangeDetectorRef, Component, inject, OnDestroy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiService } from '../services/api.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout-ui',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './layout-ui.component.html',
  styleUrl: './layout-ui.component.scss'
})
export class LayoutUiComponent implements OnDestroy {
  isApiKeyStored = false;
  mobileQuery: MediaQueryList;

  #apiService = inject(ApiService);
  #router = inject(Router);
  readonly #mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.isApiKeyStored = !!this.#apiService.getStorageKey();
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.#mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('click', this.#mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('click', this.#mobileQueryListener);
  }

  clearApiKey() {
    this.#apiService.apiKey.set('');
    this.#apiService.removeStorageKey();
    this.#router.navigateByUrl('/enter');
  }
}
