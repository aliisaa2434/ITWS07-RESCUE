import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonFooter,
  IonInput,
  IonItem,
  IonLabel,
  IonText,
  IonToolbar,
} from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    IonButton,
    IonCheckbox,
    IonContent,
    IonFooter,
    IonInput,
    IonItem,
    IonLabel,
    IonText,
    IonToolbar,
  ],
})
export class LoginPage {
  private readonly router = inject(Router);
  private readonly formVersion = signal(0);
  email = '';
  password = '';
  rememberMe = false;
  readonly submitted = signal(false);
  readonly formReady = computed(() => {
    this.formVersion();
    return this.email.trim().length > 0 && this.password.length >= 6;
  });

  touchForm(): void {
    this.formVersion.update((version) => version + 1);
  }

  login(): void {
    this.submitted.set(true);
    if (this.formReady()) {
      void this.router.navigate(['/dashboard']);
    }
  }
}
