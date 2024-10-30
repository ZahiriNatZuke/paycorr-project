import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '@app/env';
import { AppStore } from '@app/store';
import { finalize } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
	const { setIsFetching } = inject(AppStore);

	setIsFetching(true);

	const newReq = req.clone({
		setParams: {
			'api-key': environment.NEW_YORK_TIMES_API_KEY,
		},
	});

	return next(newReq).pipe(finalize(() => setIsFetching(false)));
};
