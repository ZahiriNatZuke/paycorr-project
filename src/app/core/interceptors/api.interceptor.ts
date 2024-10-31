import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotiflixService } from '@app/core/services';
import { environment } from '@app/env';
import { catchError, finalize, throwError } from 'rxjs';
import { AppStore } from 'src/app/store';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
	const { setIsFetching } = inject(AppStore);
	const notiflix = inject(NotiflixService);

	setIsFetching(true);

	const newReq = req.clone({
		setParams: {
			'api-key': environment.NEW_YORK_TIMES_API_KEY,
		},
	});

	return next(newReq).pipe(
		catchError(error => {
			if (error.status === 401) {
				notiflix.notify('Authentication error.', 'warning');
			}

			if (error.status === 404) {
				notiflix.notify('Resource not found.', 'warning');
			}

			if ([500, 429].includes(error.status)) {
				notiflix.notify(
					'Lost connection with the service. Try again later.',
					'failure'
				);
			}

			notiflix.closeLoading();
			return throwError(() => error);
		}),
		finalize(() => setIsFetching(false))
	);
};
