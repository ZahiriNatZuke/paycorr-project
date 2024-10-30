import {
	APP_INITIALIZER,
	ApplicationConfig,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
	provideHttpClient,
	withFetch,
	withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from '@app/app.routes';
import { apiInterceptor } from '@app/core/interceptors';
import { AppStore } from '@app/store';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideAnimationsAsync(),
		provideHttpClient(withFetch(), withInterceptors([apiInterceptor])),
		{
			provide: APP_INITIALIZER,
			useFactory: (appStore: any) => () => appStore.fetchDocs(appStore.query()),
			deps: [AppStore],
			multi: true,
		},
	],
};
