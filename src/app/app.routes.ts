import { Routes } from '@angular/router';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',
	},
	{
		path: 'home',
		loadComponent: () => import('@app/views/home').then(c => c.HomeComponent),
	},
	{
		path: '**',
		redirectTo: 'home',
		pathMatch: 'full',
	},
];
