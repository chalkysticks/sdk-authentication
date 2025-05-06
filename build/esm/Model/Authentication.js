import * as OAuth from '../Service/OAuth';
import { Jwt } from './Jwt';
import { Event, Model, Provider } from '@chalkysticks/sdk-core';
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
    async changePassword(currentPassword, newPassword, newPasswordConfirmation) {
        return new Promise((resolve, reject) => {
            this.endpoint = 'auth/change-password';
            this.setHeader('Authorization', `Bearer ${this.token}`);
            this.post({
                current_password: currentPassword,
                new_password: newPassword,
                new_password_confirmation: newPasswordConfirmation,
            })
                .then((request) => {
                resolve();
            })
                .catch((request) => {
                const errorData = this.handleError(request.response?.data || {});
                reject(errorData);
            });
        });
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
                const token = await OAuth.googleFromApp();
                try {
                    const userModel = await this.loginWithToken(token);
                    this.dispatch('login:success', { userModel });
                }
                catch (e) {
                    this.dispatch('login:failure', { error: e });
                }
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
        Event.Bus.dispatch('login', {
            token: token,
            user: response?.data.user,
            userModel: userModel,
        });
        return userModel;
    }
    handleError(response = {}) {
        const errorData = Object.assign(response.data, {
            code: response.status || 0,
        });
        this.trigger('login:error', { error: errorData });
        this.trigger('error', { error: errorData });
        Event.Bus.dispatch('login:error', {
            error: errorData,
        });
        return errorData;
    }
    static getAuthToken() {
        const token = new URLSearchParams(location.search).get('token');
        return token || '';
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvTW9kZWwvQXV0aGVudGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxrQkFBa0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQzVCLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBVyxNQUFNLHdCQUF3QixDQUFDO0FBaUJ6RSxNQUFNLE9BQU8sY0FBZSxTQUFRLEtBQUssQ0FBQyxJQUFJO0lBQTlDOztRQU1RLGFBQVEsR0FBVyxZQUFZLENBQUM7UUFPaEMsV0FBTSxHQUFhLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBMFEzQyxDQUFDO0lBclFBLElBQVcsR0FBRztRQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBTSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBYSxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFVTSxVQUFVO1FBQ2hCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFlTSxLQUFLLENBQUMsY0FBYyxDQUFDLGVBQXVCLEVBQUUsV0FBbUIsRUFBRSx1QkFBK0I7UUFDeEcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN0QyxJQUFJLENBQUMsUUFBUSxHQUFHLHNCQUFzQixDQUFDO1lBRXZDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxFQUFFLFVBQVUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7WUFFeEQsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDVCxn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