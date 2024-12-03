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
                const userModel = this.handleResponse(request.response || {});
                resolve(userModel);
            })
                .catch((request) => {
                const errorData = this.handleError(request.response || {});
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
                const userModel = this.handleResponse(request.response || {});
                resolve(userModel);
            })
                .catch((request) => {
                const errorData = this.handleError(request.response || {});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvTW9kZWwvQXV0aGVudGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUM1QixPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBVyxNQUFNLHdCQUF3QixDQUFDO0FBT2xFLE1BQU0sT0FBTyxjQUFlLFNBQVEsS0FBSyxDQUFDLElBQUk7SUFBOUM7O1FBTVEsYUFBUSxHQUFXLFlBQVksQ0FBQztRQU9oQyxXQUFNLEdBQWEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFvTDNDLENBQUM7SUEvS0EsSUFBVyxHQUFHO1FBQ2IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFNLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFhLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQVVNLFVBQVU7UUFDaEIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQWFNLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBYSxFQUFFLFFBQWdCO1FBQ2pELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQztpQkFDNUIsSUFBSSxDQUFDLENBQUMsT0FBZ0IsRUFBRSxFQUFFO2dCQUMxQixNQUFNLFNBQVMsR0FBZSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzFFLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZ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