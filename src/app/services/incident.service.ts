import { Injectable, signal } from '@angular/core';

export type IncidentStatus = 'Pending' | 'In Review' | 'Resolved';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

export interface IncidentReport {
  id: string;
  type: string;
  description: string;
  location: string;
  status: IncidentStatus;
  submittedAt: string;
  contactName: string;
  contactNumber: string;
}

export interface IncidentSubmission {
  type: string;
  description: string;
  location: string;
  contactName: string;
  contactNumber: string;
}

@Injectable({ providedIn: 'root' })
export class IncidentService {
  private nextReference = 11;

  readonly incidentTypes = [
    'Vehicle Accident',
    'Medical Emergency',
    'Fire',
    'Suspicious Activity',
    'Natural Disaster',
  ];

  readonly activeUser = signal<UserProfile>({
    firstName: 'Juan',
    lastName: 'Dela Cruz',
    email: 'juan.delacruz@example.com',
    role: 'Civilian',
  });

  readonly reports = signal<IncidentReport[]>([
    {
      id: 'INC-010',
      type: 'Vehicle Accident',
      description: 'Two vehicles involved near the community center.',
      location: 'Rizal Avenue',
      status: 'Pending',
      submittedAt: 'Today, 8:42 AM',
      contactName: 'Juan Dela Cruz',
      contactNumber: '0917 555 0123',
    },
    {
      id: 'INC-009',
      type: 'Medical Emergency',
      description: 'Requested medical support for an elderly neighbor.',
      location: 'Mabini Street',
      status: 'In Review',
      submittedAt: 'Yesterday, 4:18 PM',
      contactName: 'Juan Dela Cruz',
      contactNumber: '0917 555 0123',
    },
    {
      id: 'INC-008',
      type: 'Street Light Outage',
      description: 'The street light has been out for three nights.',
      location: 'Bonifacio Street',
      status: 'Resolved',
      submittedAt: 'Aug 28, 2026',
      contactName: 'Juan Dela Cruz',
      contactNumber: '0917 555 0123',
    },
  ]);

  submitIncident(submission: IncidentSubmission): IncidentReport {
    const report: IncidentReport = {
      ...submission,
      id: `INC-${String(this.nextReference++).padStart(3, '0')}`,
      status: 'Pending',
      submittedAt: 'Just now',
    };

    this.reports.update((reports) => [report, ...reports]);
    return report;
  }
}
