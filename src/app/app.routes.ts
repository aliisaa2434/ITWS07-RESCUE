import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then(({ LoginPage }) => LoginPage),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then(({ SignupPage }) => SignupPage),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then(({ DashboardPage }) => DashboardPage),
  },
  {
    path: 'report-incident',
    loadComponent: () => import('./pages/report-incident/report-incident.page').then(({ ReportIncidentPage }) => ReportIncidentPage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];