import { Pipe, PipeTransform, SecurityContext, inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Multimedia } from '@app/core/interfaces';
import { environment } from '@app/env';

@Pipe({
	name: 'safeImage',
	standalone: true,
})
export class SafeImagePipe implements PipeTransform {
	#domSanitizer = inject(DomSanitizer);

	transform(value: Multimedia[]) {
		if (!value || !value.length) {
			return 'https://fakeimg.pl/290x163?text=Not+Found';
		}
		const imageUrl =
			value.find(media => media.subtype === 'master315')?.url ?? value[0].url;
		return this.#domSanitizer.sanitize(
			SecurityContext.URL,
			`${environment.NEW_YORK_TIMES_DOMAIN}${imageUrl}`
		);
	}
}
