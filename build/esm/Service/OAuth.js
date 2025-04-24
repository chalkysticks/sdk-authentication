import * as Factory from '../Factory';
import { Constants } from '@chalkysticks/sdk-core';
export async function googleFromApp() {
    try {
        const { OAuth2Client } = await import('@byteowls/capacitor-oauth2');
        const authModel = Factory.Authentication.model();
        const baseUrl = authModel.b.getBaseUrl();
        const response = await OAuth2Client.authenticate({
            accessTokenEndpoint: 'https://oauth2.googleapis.com/token',
            appId: Constants.ANDROID_CLIENT_ID,
            authorizationBaseUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
            pkceEnabled: true,
            redirectUrl: Constants.ANDROID_REDIRECT_URI,
            responseType: 'code',
            scope: 'openid profile email',
        });
        const url = `${baseUrl}/auth/google`;
        const id_token = response.access_token_response.id_token;
        const headers = {
            'Content-Type': 'application/json',
        };
        const method = 'POST';
        const result = await fetch(url, {
            body: JSON.stringify({ id_token }),
            headers: headers,
            method: method,
        });
        const json = await result.json();
        const jwt = json.token;
        return jwt;
    }
    catch (e) {
        return '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT0F1dGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvU2VydmljZS9PQXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssT0FBTyxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFTbkQsTUFBTSxDQUFDLEtBQUssVUFBVSxhQUFhO0lBQ2xDLElBQUksQ0FBQztRQUNKLE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDakQsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUV6QyxNQUFNLFFBQVEsR0FBUSxNQUFNLFlBQVksQ0FBQyxZQUFZLENBQUM7WUFDckQsbUJBQW1CLEVBQUUscUNBQXFDO1lBQzFELEtBQUssRUFBRSxTQUFTLENBQUMsaUJBQWlCO1lBQ2xDLG9CQUFvQixFQUFFLDhDQUE4QztZQUNwRSxXQUFXLEVBQUUsSUFBSTtZQUNqQixXQUFXLEVBQUUsU0FBUyxDQUFDLG9CQUFvQjtZQUMzQyxZQUFZLEVBQUUsTUFBTTtZQUNwQixLQUFLLEVBQUUsc0JBQXNCO1NBTTdCLENBQUMsQ0FBQztRQUdILE1BQU0sR0FBRyxHQUFHLEdBQUcsT0FBTyxjQUFjLENBQUM7UUFDckMsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsQ0FBQztRQUN6RCxNQUFNLE9BQU8sR0FBRztZQUNmLGNBQWMsRUFBRSxrQkFBa0I7U0FDbEMsQ0FBQztRQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUl0QixNQUFNLE1BQU0sR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUU7WUFDL0IsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQztZQUNsQyxPQUFPLEVBQUUsT0FBTztZQUNoQixNQUFNLEVBQUUsTUFBTTtTQUNkLENBQUMsQ0FBQztRQUVILE1BQU0sSUFBSSxHQUFHLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFdkIsT0FBTyxHQUFHLENBQUM7SUFDWixDQUFDO0lBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNaLE9BQU8sRUFBRSxDQUFDO0lBQ1gsQ0FBQztBQUNGLENBQUMifQ==