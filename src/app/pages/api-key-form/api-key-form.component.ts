import { Component, inject } from '@angular/core';
import { MatError, MatFormField, MatHint, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from '../../services/api.service';
import { SpinnerService } from '../../shared/spinner/spinner.service';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-api-key-form',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    MatHint,
    MatIcon,
    MatInput,
    MatSuffix,
    ReactiveFormsModule,
    MatError,
    MatButtonModule,
    MatCheckboxModule
  ],
  templateUrl: './api-key-form.component.html',
  styleUrl: './api-key-form.component.scss'
})
export class ApiKeyFormComponent {
  keyForm: FormGroup;

  #formBuilder = inject(FormBuilder);
  #apiService = inject(ApiService);
  #spinnerService = inject(SpinnerService);
  #router = inject(Router);

  constructor() {
    this.keyForm = this.#formBuilder.group({
      key: new FormControl('', [Validators.required]),
      remember: new FormControl(false)
    });
  }

  getErrorMessage(): string | null {
    if (this.keyForm.invalid) {
      return 'You must provide an API key.';
    }
    return null;
  }

  submitKey() {
    this.#spinnerService.show();

    if (this.keyForm.invalid) {
      this.#spinnerService.hide();
      return;
    }

    const key = this.keyForm.value['key'].trim();

    this.#apiService.setApiKey(key);

    if (this.keyForm.value['remember']) {
      this.#apiService.setStorageKey(key);
    }

    this.#spinnerService.hide();
    this.#router.navigateByUrl('/');
  }
}
