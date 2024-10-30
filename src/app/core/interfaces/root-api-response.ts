import { ResponseData } from '@app/core/interfaces';

export interface RootApiResponse {
	status: string;
	copyright: string;
	response: ResponseData;
}
