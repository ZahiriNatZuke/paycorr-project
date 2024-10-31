import { Injectable } from '@angular/core';
import Notiflix from 'notiflix';

@Injectable({ providedIn: 'root' })
export class NotiflixService {
	openLoading(): void {
		Notiflix.Loading.pulse({
			backgroundColor: 'rgba(255,255,255,.9)',
			clickToClose: false,
			svgColor: '#000',
		});
	}

	closeLoading(delay = 0): void {
		Notiflix.Loading.remove(delay);
	}

	notify(
		message: string,
		type: 'success' | 'failure' | 'info' | 'warning'
	): void {
		Notiflix.Notify[type](message, { timeout: 3000 });
	}
}
