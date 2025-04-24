import { Jwt } from './Jwt';
import { Model, Provider } from '@chalkysticks/sdk-core';
export class Authentication extends Model.Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'auth/login';
        this.fields = ['jwt', 'user'];
    }
    get jwt() {
        return this.hasOne('jwt', Jwt);
    }
    get user() {
        return this.hasOne('user', Model.User);
    }
    isLoggedIn() {
        return !!this.user?.id;
    }
    async login(email, password) {
        return new Promise((resolve, reject) => {
            this.post({ email, password })
                .then((request) => {
                const userModel = this.handleResponse(request.response?.data || {});
                resolve(userModel);
            })
                .catch((request) => {
                const errorData = this.handleError(request.response?.data || {});
                reject(errorData);
            });
        });
    }
    async loginWithToken(token) {
        return new Promise((resolve, reject) => {
            this.endpoint = 'auth/login-with-token';
            this.setHeader('Authorization', `Bearer ${token}`);
            this.post()
                .then((request) => {
                const userModel = this.handleResponse(request.response?.data || {});
                resolve(userModel);
            })
                .catch((request) => {
                const errorData = this.handleError(request.response?.data || {});
                reject(errorData);
            });
        });
    }
    async loginSocial(provider = 'google', redirectTo = '/') {
        const baseUrl = this.b.getBaseUrl();
        const authenticationUrlRoot = `${baseUrl}/auth/${provider}?redirectTo=`;
        try {
            const { Capacitor } = await import('@capacitor/core');
            const { Browser } = await import('@capacitor/browser');
            if (Capacitor.isNativePlatform()) {
                const mobileRedirectUri = 'com.chalkysticks.app://oauth2redirect';
                await Browser.open({
                    url: `${authenticationUrlRoot}${encodeURIComponent(mobileRedirectUri)}`,
                });
                return;
            }
        }
        catch (e) {
            console.warn('[LoginSocial] Capacitor fallback:', e);
        }
        location.href = `${authenticationUrlRoot}${encodeURIComponent(redirectTo)}`;
    }
    loginWithGoogle(redirectTo = '/') {
        this.loginSocial('google', redirectTo);
    }
    loginWithFacebook(redirectTo = '/') {
        this.loginSocial('facebook', redirectTo);
    }
    async signup(options) {
        return new Promise((resolve, reject) => {
            this.endpoint = 'auth/register';
            this.post(options)
                .then((request) => {
                const userModel = this.handleResponse(request.response?.data || {});
                resolve(userModel);
            })
                .catch((request) => {
                const errorData = this.handleError(request.response?.data || {});
                reject(errorData);
            });
        });
    }
    handleResponse(response = {}) {
        const permissions = response?.data.permissions;
        const token = response?.data.token;
        const userModel = Model.User.hydrate(response?.data.user);
        this.set({
            jwt: {
                permissions: permissions,
                token: token,
            },
            user: userModel,
        });
        const store = Provider.Store.get();
        store.state.token = token;
        store.state.user = response?.data.user;
        store.dispatch('authentication/login', {
            token: token,
            user: response?.data.user,
        });
        this.trigger('login', { userModel });
        this.trigger('success', { userModel });
        return userModel;
    }
    handleError(response = {}) {
        const errorData = Object.assign(response.data, {
            code: response.status || 0,
        });
        this.trigger('login:error', { error: errorData });
        this.trigger('error', { error: errorData });
        return errorData;
    }
    static getAuthToken() {
        const token = new URLSearchParams(location.search).get('token');
        return token || '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvTW9kZWwvQXV0aGVudGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUM1QixPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBVyxNQUFNLHdCQUF3QixDQUFDO0FBaUJsRSxNQUFNLE9BQU8sY0FBZSxTQUFRLEtBQUssQ0FBQyxJQUFJO0lBQTlDOztRQU1RLGFBQVEsR0FBVyxZQUFZLENBQUM7UUFPaEMsV0FBTSxHQUFhLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBME4zQyxDQUFDO0lBck5BLElBQVcsR0FBRztRQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBTSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBYSxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFVTSxVQUFVO1FBQ2hCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFhTSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQWEsRUFBRSxRQUFnQjtRQUNqRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUM7aUJBQzVCLElBQUksQ0FBQyxDQUFDLE9BQWdCLEVBQUUsRUFBRTtnQkFDMUIsTUFBTSxTQUFTLEdBQWUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDaEYsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxPQUFnQixFQUFFLEVBQUU7Z0JBQzNCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ2pFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQVNNLEtBQUssQ0FBQyxjQUFjLENBQUMsS0FBYTtRQUN4QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsdUJBQXVCLENBQUM7WUFFeEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsVUFBVSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1lBRW5ELElBQUksQ0FBQyxJQUFJLEVBQUU7aUJBQ1QsSUFBSSxDQUFDLENBQUMsT0FBZ0IsRUFBRSxFQUFFO2dCQUMxQixNQUFNLFNBQVMsR0FBZSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNoRixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLE9BQWdCLEVBQUUsRUFBRTtnQkFDM0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDakUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBU00sS0FBSyxDQUFDLFdBQVcsQ0FBQyxXQUFtQixRQUFRLEVBQUUsYUFBcUIsR0FBRztRQUM3RSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BDLE1BQU0scUJBQXFCLEdBQUcsR0FBRyxPQUFPLFNBQVMsUUFBUSxjQUFjLENBQUM7UUFFeEUsSUFBSSxDQUFDO1lBQ0osTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDdEQsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFFdkQsSUFBSSxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxDQUFDO2dCQUNsQyxNQUFNLGlCQUFpQixHQUFHLHVDQUF1QyxDQUFDO2dCQUNsRSxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUM7b0JBQ2xCLEdBQUcsRUFBRSxHQUFHLHFCQUFxQixHQUFHLGtCQUFrQixDQUFDLGlCQUFpQixDQUFDLEVBQUU7aUJBQ3ZFLENBQUMsQ0FBQztnQkFDSCxPQUFPO1lBQ1IsQ0FBQztRQUNGLENBQUM7UUFBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ1osT0FBTyxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0RCxDQUFDO1FBR0QsUUFBUSxDQUFDLElBQUksR0FBRyxHQUFHLHFCQUFxQixHQUFHLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7SUFDN0UsQ0FBQztJQVFNLGVBQWUsQ0FBQyxhQUFxQixHQUFHO1FBQzlDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFRTSxpQkFBaUIsQ0FBQyxhQUFxQixHQUFHO1FBQ2hELElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFRTSxLQUFLLENBQUMsTUFBTSxDQUFDLE9BQXFDO1FBQ3hELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxlQUFlLENBQUM7WUFFaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7aUJBQ2hCLElBQUksQ0FBQyxDQUFDLE9BQWdCLEVBQUUsRUFBRTtnQkFDMUIsTUFBTSxTQUFTLEdBQWUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDaEYsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxPQUFnQixFQUFFLEVBQUU7Z0JBQzNCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ2pFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQVVTLGNBQWMsQ0FBQyxXQUFnQixFQUFFO1FBQzFDLE1BQU0sV0FBVyxHQUFXLFFBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ3ZELE1BQU0sS0FBSyxHQUFXLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQzNDLE1BQU0sU0FBUyxHQUFlLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFlLENBQUM7UUFHcEYsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNSLEdBQUcsRUFBRTtnQkFDSixXQUFXLEVBQUUsV0FBVztnQkFDeEIsS0FBSyxFQUFFLEtBQUs7YUFDWjtZQUNELElBQUksRUFBRSxTQUFTO1NBQ2YsQ0FBQyxDQUFDO1FBR0gsTUFBTSxLQUFLLEdBQVcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMzQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDMUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtZQUN0QyxLQUFLLEVBQUUsS0FBSztZQUNaLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUk7U0FDekIsQ0FBQyxDQUFDO1FBR0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUV2QyxPQUFPLFNBQVMsQ0FBQztJQUNsQixDQUFDO0lBUVMsV0FBVyxDQUFDLFdBQWdCLEVBQUU7UUFDdkMsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO1lBQzlDLElBQUksRUFBRSxRQUFRLENBQUMsTUFBTSxJQUFJLENBQUM7U0FDMUIsQ0FBQyxDQUFDO1FBR0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBRTVDLE9BQU8sU0FBUyxDQUFDO0lBQ2xCLENBQUM7SUFVTSxNQUFNLENBQUMsWUFBWTtRQUN6QixNQUFNLEtBQUssR0FBRyxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWhFLE9BQU8sS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUNwQixDQUFDO0NBR0QifQ==