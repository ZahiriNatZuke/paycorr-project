import {
	APP_INITIALIZER,
	ApplicationConfig,
	isDevMode,
	provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
	provideHttpClient,
	withFetch,
	withInterceptors,
} from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SwUpdate, provideServiceWorker } from '@angular/service-worker';
import { routes } from '@app/app.routes';
import { apiInterceptor } from '@app/core/interceptors';
import { appInitializer } from '@app/core/utils';
import { AppStore } from '@app/store';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(routes),
		provideAnimationsAsync(),
		provideHttpClient(withFetch(), withInterceptors([apiInterceptor])),
		provideServiceWorker('ngsw-worker.js', {
			enabled: !isDevMode(),
			registrationStrategy: 'registerWhenStable:30000',
		}),
		{
			provide: APP_INITIALIZER,
			useFactory: appInitializer,
			deps: [AppStore, SwUpdate],
			multi: true,
		},
	],
};
