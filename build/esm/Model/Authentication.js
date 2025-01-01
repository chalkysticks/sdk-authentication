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
    loginSocial(provider = 'google', redirectTo = '/') {
        const baseUrl = this.baseUrl;
        const authenticationUrl = `${baseUrl}/auth/${provider}?redirectTo=${encodeURIComponent(redirectTo)}`;
        location.href = authenticationUrl;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvTW9kZWwvQXV0aGVudGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUM1QixPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBVyxNQUFNLHdCQUF3QixDQUFDO0FBaUJsRSxNQUFNLE9BQU8sY0FBZSxTQUFRLEtBQUssQ0FBQyxJQUFJO0lBQTlDOztRQU1RLGFBQVEsR0FBVyxZQUFZLENBQUM7UUFPaEMsV0FBTSxHQUFhLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBME0zQyxDQUFDO0lBck1BLElBQVcsR0FBRztRQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBTSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELElBQVcsSUFBSTtRQUNkLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBYSxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFVTSxVQUFVO1FBQ2hCLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFhTSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQWEsRUFBRSxRQUFnQjtRQUNqRCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUM7aUJBQzVCLElBQUksQ0FBQyxDQUFDLE9BQWdCLEVBQUUsRUFBRTtnQkFDMUIsTUFBTSxTQUFTLEdBQWUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztnQkFDaEYsT0FBTyxDQUFDLFNBQVMs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