import { formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { QueryParams, RootApiResponse } from '@app/core/interfaces';
import { filterSuccess } from '@app/core/utils';
import { environment } from '@app/env';

@Injectable({ providedIn: 'root' })
export class ApiService {
	#http = inject(HttpClient);

	fetchDocs({ begin_date, end_date, page }: QueryParams) {
		return this.#http
			.get<RootApiResponse>(environment.NEW_YORK_TIMES_API_URL, {
				params: {
					sort: 'relevance',
					begin_date: formatDate(begin_date, 'YYYYMMdd', 'en'),
					end_date: formatDate(end_date, 'YYYYMMdd', 'en'),
					page,
					fl: 'headline,abstract,multimedia,web_url,word_count,_id',
				},
			})
			.pipe(filterSuccess());
	}
}
