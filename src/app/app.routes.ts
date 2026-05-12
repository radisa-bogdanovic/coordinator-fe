import { Routes } from '@angular/router';
import { Dashboard } from './pages/dashboard/dashboard';
import { Taskovi } from './pages/taskovi/taskovi';
import { Notes } from './pages/notes/notes';
import { About } from './pages/about/about';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: Dashboard, title: 'Dashboard' },
  { path: 'tasks', component: Taskovi, title: 'Tasks' },
  { path: 'notes', component: Notes, title: 'Notes' },
  { path: 'about', component: About, title: 'About' },
  { path: '**', redirectTo: 'dashboard' },
];
