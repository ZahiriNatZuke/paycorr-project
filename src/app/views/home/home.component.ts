import { Component, Signal, computed, inject } from '@angular/core';
import { Doc } from '@app/core/interfaces';
import { SafeImagePipe } from '@app/core/pipes';
import { AppStore } from 'src/app/store';

@Component({
	selector: 'app-home',
	standalone: true,
	imports: [SafeImagePipe],
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
})
export class HomeComponent {
	#appStore = inject(AppStore);

	docs: Signal<Doc[]> = this.#appStore.entities;
	isReady: Signal<boolean> = computed(() => !this.#appStore.isFetching());
}
