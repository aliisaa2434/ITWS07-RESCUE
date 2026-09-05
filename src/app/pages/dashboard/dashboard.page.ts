import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonBadge,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addCircleOutline, chevronForwardOutline, logOutOutline, notificationsOutline } from 'ionicons/icons';

import { IncidentCardComponent } from '../../components/incident-card/incident-card.component';
import { IncidentReport, IncidentService } from '../../services/incident.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [RouterLink, IncidentCardComponent, IonBadge, IonButton, IonContent, IonHeader, IonIcon, IonToolbar],
})
export class DashboardPage {
  private readonly incidentService = inject(IncidentService);
  private readonly router = inject(Router);
  readonly user = this.incidentService.activeUser;
  readonly reports = this.incidentService.reports;
  readonly greeting = computed(() => `Good Morning, ${this.user().firstName} ${this.user().lastName}`);

  constructor() {
    addIcons({ addCircleOutline, chevronForwardOutline, logOutOutline, notificationsOutline });
  }

  logout(): void {
    void this.router.navigate(['/login']);
  }

  onReportSelected(report: IncidentReport): void {
    console.info('Selected incident', report.id);
  }
}
