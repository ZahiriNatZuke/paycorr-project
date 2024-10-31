import { inject, Injector, runInInjectionContext } from '@angular/core';
import { Doc, QueryParams, RootApiResponse } from '@app/core/interfaces';
import { ApiService, NotiflixService } from '@app/core/services';
import { environment } from '@app/env';
import { patchState, signalStore, withHooks, withMethods, withState, } from '@ngrx/signals';
import { setEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { fromEvent, Subject, takeUntil, tap } from 'rxjs';

export type AppState = {
	isFetching: boolean;
	status: 'online' | 'offline';
	query: QueryParams;
	destroy$: Subject<boolean>;
};

const initialAppState: AppState = {
	isFetching: true,
	status: 'online',
	query: {
		page: 0,
		begin_date: new Date(),
		end_date: new Date(),
	},
	destroy$: new Subject<boolean>(),
};

export const AppStore = signalStore(
	{ providedIn: 'root' },
	withState(initialAppState),
	withEntities<Doc>(),
	withMethods(store => {
		const injector = inject(Injector);
		const api = inject(ApiService);
		const notiflix = inject(NotiflixService);

		return {
			setIsFetching(isFetching: boolean): void {
				patchState(store, { isFetching });
			},
			setStatus(status: 'online' | 'offline'): void {
				patchState(store, { status });
			},
			fetchDocs: (params: QueryParams) => {
				notiflix.openLoading();
				if (store.status() === 'online') {
					runInInjectionContext(injector, () =>
						rxMethod<RootApiResponse>(() =>
							api.fetchDocs(params).pipe(
								tap(({ response }: RootApiResponse) => {
									patchState(
										store,
										setEntities(
											response.docs.map(doc => ({ ...doc, id: doc._id }))
										)
									);
									localStorage.setItem(
										environment.STORAGE_KEY,
										JSON.stringify(response.docs)
									);
									notiflix.closeLoading();
								})
							)
						)
					);
				} else {
					notiflix.closeLoading(500);
				}
			},
		};
	}),
	withHooks(store => {
		return {
			onInit: () => {
				store.setStatus(navigator.onLine ? 'online' : 'offline');

				fromEvent(window, 'online')
					.pipe(takeUntil(store.destroy$()))
					.subscribe(() => store.setStatus('online'));

				fromEvent(window, 'offline')
					.pipe(takeUntil(store.destroy$()))
					.subscribe(() => store.setStatus('offline'));

				if (localStorage.getItem(environment.STORAGE_KEY))
					try {
						const docs: Doc[] = JSON.parse(
							localStorage.getItem(environment.STORAGE_KEY) ?? ''
						);
						patchState(
							store,
							setEntities(docs.map(doc => ({ ...doc, id: doc._id })))
						);
					} catch (_) {}
			},
			onDestroy: () => store.destroy$().next(true),
		};
	})
);
