import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Iniciar Sesión',
    loadComponent: () => import('./auth/login/login.component'),
  },
  {
    path: 'registro',
    title: 'Registro de Usurario',
    loadComponent: () => import('./auth/registro/registro.component'),
  },
  {
    path: 'tareas',
    loadComponent: () => import('./Dashboard/dashboard.component'),
    children: [
      {
        path: 'crear',
        title: 'Crear Nueva',
        loadComponent: () =>
          import('./Dashboard/pages/agregar/agregar.component'),
      },
      {
        path: 'resumen',
        title: 'Todas las tareas',
        loadComponent: () =>
          import('./Dashboard/pages/resumen/resumen.component'),
      },
      {
        path: 'completas',
        title: 'Tareas Completas',
        loadComponent: () =>
          import('./Dashboard/pages/completadas/completadas.component'),
      },
      {
        path: 'pendientes',
        title: 'Tareas Pendientes',
        loadComponent: () =>
          import('./Dashboard/pages/pendientes/pendientes.component'),
      },
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
