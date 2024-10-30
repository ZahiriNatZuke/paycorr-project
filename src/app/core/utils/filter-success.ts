import { RootApiResponse } from '@app/core/interfaces';
import { filter, pipe } from 'rxjs';

export function filterSuccess() {
	return pipe(filter((response: RootApiResponse) => response.status === 'OK'));
}
