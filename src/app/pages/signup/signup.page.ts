import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/angular';

import { DigitsOnlyDirective } from '../../directives/digits-only.directive';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    IonButton,
    IonCheckbox,
    IonContent,
    IonInput,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonText,
    DigitsOnlyDirective,
  ],
})
export class SignupPage {
  private readonly router = inject(Router);
  private readonly formVersion = signal(0);
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  role = 'Civilian';
  password = '';
  confirmPassword = '';
  acceptedTerms = false;
  readonly submitted = signal(false);
  readonly passwordMatches = computed(() => {
    this.formVersion();
    return this.password.length > 0 && this.password === this.confirmPassword;
  });
  readonly formReady = computed(() => {
    this.formVersion();
    return this.firstName.trim().length > 0 &&
      this.lastName.trim().length > 0 &&
      this.email.includes('@') &&
      this.phone.trim().length >= 7 &&
      this.password.length >= 6 &&
      this.passwordMatches() &&
      this.acceptedTerms;
  });

  readonly roles = ['Civilian', 'Volunteer'];

  touchForm(): void {
    this.formVersion.update((version) => version + 1);
  }

  createAccount(): void {
    this.submitted.set(true);
    if (this.formReady()) {
      void this.router.navigate(['/dashboard']);
    }
  }
}
