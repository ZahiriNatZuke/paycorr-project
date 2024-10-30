import { Person } from '@app/core/interfaces';

export interface Byline {
	original: string;
	person: Person[];
	organization: string | null;
}
