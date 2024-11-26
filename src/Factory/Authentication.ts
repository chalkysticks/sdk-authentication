import * as Model from '../Model';
import { Constants } from '@chalkysticks/sdk-core';

/**
 * @param Record<string, any> options
 * @return Model.Authentication
 */
export function model(options: Record<string, any> = {}): Model.Authentication {
	return new Model.Authentication(
		undefined,
		Object.assign(
			{
				baseUrl: Constants.API_URL_V1,
			},
			options,
		),
	);
}
