import { Headline, Multimedia } from '@app/core/interfaces';

export interface Doc {
	id: string;
	abstract: string;
	web_url: string;
	multimedia: Multimedia[];
	headline: Headline;
	_id: string;
	word_count: number;
}
