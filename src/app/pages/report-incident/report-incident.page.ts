import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { cameraOutline, checkmarkCircle, locationOutline } from 'ionicons/icons';

import { DigitsOnlyDirective } from '../../directives/digits-only.directive';
import { IncidentReport, IncidentService } from '../../services/incident.service';

@Component({
  selector: 'app-report-incident',
  templateUrl: './report-incident.page.html',
  styleUrls: ['./report-incident.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonTitle,
    IonToolbar,
    DigitsOnlyDirective,
  ],
})
export class ReportIncidentPage {
  private readonly incidentService = inject(IncidentService);
  private readonly router = inject(Router);
  private readonly formVersion = signal(0);
  readonly currentStep = signal(1);
  readonly locationCaptured = signal(false);
  readonly photoAdded = signal(false);
  readonly submitted = signal(false);
  readonly createdReport = signal<IncidentReport | null>(null);
  readonly incidentTypes = this.incidentService.incidentTypes;
  readonly detailsReady = computed(() => {
    this.formVersion();
    return this.incidentType.length > 0 &&
      this.description.trim().length >= 10 &&
      this.contactName.trim().length > 0 &&
      this.contactNumber.trim().length >= 7;
  });

  incidentType = '';
  description = '';
  contactName = '';
  contactNumber = '';
  location = '';
  photoName = '';

  touchForm(): void {
    this.formVersion.update((version) => version + 1);
  }

  constructor() {
    addIcons({ cameraOutline, checkmarkCircle, locationOutline });
  }

  captureLocation(): void {
    this.locationCaptured.set(true);
    this.location = 'Rizal Avenue, Barangay San Isidro';
  }

  addPhoto(): void {
    this.photoAdded.set(true);
    this.photoName = 'incident-photo.jpg';
  }

  continueToDetails(): void {
    if (this.locationCaptured()) {
      this.currentStep.set(2);
    }
  }

  submitReport(): void {
    this.submitted.set(true);
    if (!this.detailsReady()) {
      return;
    }

    const report = this.incidentService.submitIncident({
      type: this.incidentType,
      description: this.description,
      location: this.location,
      contactName: this.contactName,
      contactNumber: this.contactNumber,
    });
    this.createdReport.set(report);
    this.currentStep.set(3);
  }

  startAnotherReport(): void {
    void this.router.navigate(['/report-incident']).then(() => window.location.reload());
  }
}
