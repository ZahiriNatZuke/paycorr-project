import { Byline, Headline, Keyword, Multimedia } from '@app/core/interfaces';

export interface Doc {
	id: string;
	abstract: string;
	web_url: string;
	snippet: string;
	lead_paragraph: string;
	source: string;
	multimedia: Multimedia[];
	headline: Headline;
	keywords: Keyword[];
	pub_date: string;
	document_type: string;
	news_desk: string;
	section_name: string;
	byline: Byline;
	type_of_material: string;
	_id: string;
	word_count: number;
	uri: string;
	subsection_name?: string;
	print_section?: string;
	print_page?: string;
}
