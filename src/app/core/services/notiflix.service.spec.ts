import { TestBed } from '@angular/core/testing';

import { NotiflixService } from './notiflix.service';

describe('NotiflixService', () => {
	let service: NotiflixService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(NotiflixService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
