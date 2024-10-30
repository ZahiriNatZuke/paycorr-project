import { DatePipe, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppStore } from 'src/app/store';

@Component({
	selector: 'app-navbar',
	standalone: true,
	imports: [RouterLink, NgOptimizedImage, DatePipe],
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
	#appStore = inject(AppStore);
	protected readonly Date = Date;

	refreshDocs() {
		this.#appStore.fetchDocs(this.#appStore.query());
	}
}
