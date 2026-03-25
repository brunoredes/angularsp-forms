import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {
    path: 'login', children: [
      { path: 'reactive', loadComponent: () => import('./reactive/login/login').then(c => c.Login) },
      { path: 'signal', loadComponent: () => import('./signal/login/login').then(c => c.Login) },
    ]
  },
];
