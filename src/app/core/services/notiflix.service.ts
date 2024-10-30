import { Injectable } from '@angular/core';
import Notiflix from 'notiflix';

@Injectable({ providedIn: 'root' })
export class NotiflixService {
	openLoading(): void {
		Notiflix.Loading.pulse({
			backgroundColor: 'rgba(255,255,255,.9)',
			clickToClose: false,
		});
	}

	closeLoading(): void {
		Notiflix.Loading.remove();
	}
}
