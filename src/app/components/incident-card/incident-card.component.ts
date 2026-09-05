import { Component, input, model, output } from '@angular/core';
import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { chevronForwardOutline, locationOutline } from 'ionicons/icons';

import { IncidentReport } from '../../services/incident.service';

@Component({
  selector: 'app-incident-card',
  templateUrl: './incident-card.component.html',
  styleUrls: ['./incident-card.component.scss'],
  standalone: true,
  imports: [
    IonBadge,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
  ],
})
export class IncidentCardComponent {
  readonly report = input.required<IncidentReport>();
  readonly viewRequested = output<IncidentReport>();
  readonly expanded = model(false);

  constructor() {
    addIcons({ chevronForwardOutline, locationOutline });
  }

  toggleExpanded(): void {
    this.expanded.update((value) => !value);
  }

  requestView(): void {
    this.viewRequested.emit(this.report());
  }
}
