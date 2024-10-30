import { Injector, inject, runInInjectionContext } from '@angular/core';
import { Doc, QueryParams, RootApiResponse } from '@app/core/interfaces';
import { ApiService, NotiflixService } from '@app/core/services';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { addEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tap } from 'rxjs';

export type AppState = {
	isFetching: boolean;
	query: QueryParams;
};

const initialAppState: AppState = {
	isFetching: false,
	query: {
		page: 0,
		begin_date: new Date(),
		end_date: new Date(),
	},
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
			addDocs(newDocs: Doc[]): void {
				patchState(store, addEntities(newDocs));
			},
			fetchDocs: (params: QueryParams) => {
				notiflix.openLoading();
				return runInInjectionContext(injector, () =>
					rxMethod<RootApiResponse>(() =>
						api.fetchDocs(params).pipe(
							tap(({ response }: RootApiResponse) => {
								patchState(store, addEntities(response.docs));
								notiflix.closeLoading();
							})
						)
					)
				);
			},
		};
	})
);
