declare module '@byteowls/capacitor-oauth2' {
	/**
	 * Browser API for opening URLs in a browser-like view.
	 */
	export interface OAuth2Client {
		authenticate: any;
	}

	export const OAuth2Client: OAuth2Client;
}
