import * as Factory from '../Factory';
import { Constants } from '@chalkysticks/sdk-core';

/**
 * This is a simple example of how to use the OAuth2Client to authenticate with Google.
 *
 * @todo Make some of these URLs configurable
 *
 * @return Promise<string>
 */
export async function googleFromApp(): Promise<string> {
	try {
		const { OAuth2Client } = await import('@byteowls/capacitor-oauth2');
		const authModel = Factory.Authentication.model();
		const baseUrl = authModel.b.getBaseUrl();

		const response: any = await OAuth2Client.authenticate({
			accessTokenEndpoint: 'https://oauth2.googleapis.com/token',
			appId: Constants.ANDROID_CLIENT_ID,
			authorizationBaseUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
			pkceEnabled: true,
			redirectUrl: Constants.ANDROID_REDIRECT_URI,
			responseType: 'code',
			scope: 'openid profile email',

			// web: {
			// 	redirectUrl: 'http://localhost', // fallback for web
			// 	windowOptions: 'height=600,left=100,top=100'
			// }
		});

		// @todo maybe needs swapping
		const url = `${baseUrl}/auth/google`;
		const id_token = response.access_token_response.id_token;
		const headers = {
			'Content-Type': 'application/json',
		};
		const method = 'POST';

		// Call the ChalkySticks API to convert our access token into a user PAT
		// @todo this could be made better
		const result = await fetch(url, {
			body: JSON.stringify({ id_token }),
			headers: headers,
			method: method,
		});

		const json = await result.json();
		const jwt = json.token;

		return jwt;
	} catch (e) {
		return '';
	}
}
