import * as OAuth from '../Service/OAuth';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvTW9kZWwvQXV0aGVudGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSxrQkFBa0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sT0FBTyxDQUFDO0FBQzVCLE9BQU8sRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFXLE1BQU0sd0JBQXdCLENBQUM7QUFpQmxFLE1BQU0sT0FBTyxjQUFlLFNBQVEsS0FBSyxDQUFDLElBQUk7SUFBOUM7O1FBTVEsYUFBUSxHQUFXLFlBQVksQ0FBQztRQU9oQyxXQUFNLEdBQWEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUE4UDNDLENBQUM7SUF6UEEsSUFBVyxHQUFHO1FBQ2IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFNLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFhLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQVVNLFVBQVU7UUFDaEIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQWVNLEtBQUssQ0FBQyxjQUFjLENBQUMsZUFBdUIsRUFBRSxXQUFtQixFQUFFLHVCQUErQjtRQUN4RyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxRQUFRLEdBQUcsc0JBQXNCLENBQUM7WUFFdkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLEVBQUUsVUFBVSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUV4RCxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNULGdCQUFnQixFQUFF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