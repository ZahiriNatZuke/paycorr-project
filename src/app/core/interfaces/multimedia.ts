import { Legacy } from '@app/core/interfaces';

export interface Multimedia {
	rank: number;
	subtype: string;
	caption: unknown;
	credit: unknown;
	type: string;
	url: string;
	height: number;
	width: number;
	legacy: Legacy;
	subType: string;
	crop_name: string;
}
