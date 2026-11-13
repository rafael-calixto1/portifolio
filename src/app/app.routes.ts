import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', loadComponent: () => import('./pages/home').then((m) => m.Home) },
  { path: 'about', data: { header: 'About' }, loadComponent: () => import('./pages/about').then((m) => m.About) },
  { path: 'skills', data: { header: 'Skills' }, loadComponent: () => import('./pages/skills').then((m) => m.Skills) },
  { path: 'education', data: { header: 'Education' }, loadComponent: () => import('./pages/education').then((m) => m.Education) },
  { path: 'experience', data: { header: 'Experience' }, loadComponent: () => import('./pages/experience').then((m) => m.Experience) },
  { path: 'projects', data: { header: 'Projects' }, loadComponent: () => import('./pages/projects').then((m) => m.Projects) },
  { path: '**', redirectTo: '' },
];
