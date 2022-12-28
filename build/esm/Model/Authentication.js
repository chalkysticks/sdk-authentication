import { ModelBase, ModelUser, StoreProvider } from '@chalkysticks/sdk-core';
import ModelJwt from './Jwt';
export default class ModelAuthentication extends ModelBase {
    endpoint = 'auth/login';
    fields = [
        'jwt',
        'user',
    ];
    get jwt() {
        return this.hasOne('jwt', ModelJwt);
    }
    get user() {
        return this.hasOne('user', ModelUser);
    }
    isLoggedIn() {
        return !!this.user?.id;
    }
    async login(email, password) {
        return new Promise((resolve, reject) => {
            this.post({ email, password })
                .then((request) => {
                const permissions = request.response?.data.permissions;
                const token = request.response?.data.token;
                const userModel = ModelUser.hydrate(request.response?.data.user);
                StoreProvider.get().state.token = token;
                this.trigger('login', { userModel });
                this.trigger('login:success', { userModel });
                resolve(userModel);
            })
                .catch((request) => {
                const errorData = request.response?.data;
                this.trigger('login:error', { error: errorData });
                this.trigger('login:failure', { error: errorData });
                reject(errorData);
            });
        });
    }
    loginSocial(provider = 'google') {
        const redirect_to = location.href;
        const redirect_url = 'http://localhost:3333/auth/' + provider + '/redirect?redirect_to=' + redirect_to;
        location.href = redirect_url;
    }
}
//# sourceMappingURL=Authentication.js.map