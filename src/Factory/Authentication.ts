import * as Model from '../Model';
import { Constants } from '@chalkysticks/sdk-core';

/**
 * @return Model.Authentication
 */
export function model(): Model.Authentication {
	return new Model.Authentication(undefined, {
		baseUrl: Constants.API_URL_V1,
	});
}
