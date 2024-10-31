import { SwUpdate } from '@angular/service-worker';

export function appInitializer(appStore: any, swUpdate: SwUpdate) {
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
