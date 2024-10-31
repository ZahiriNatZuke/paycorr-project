import { Signal } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { QueryParams } from '@app/core/interfaces';

type AppStoreType = {
	fetchDocs: (params: QueryParams) => void;
	query: Signal<QueryParams>;
};

export function appInitializer(appStore: AppStoreType, swUpdate: SwUpdate) {
	return () => {
		if (swUpdate.isEnabled) {
			swUpdate.checkForUpdate().then(result => {
				if (result) window.location.reload();
				else appStore.fetchDocs(appStore.query());
			});
		} else {
			appStore.fetchDocs(appStore.query());
		}
	};
}
