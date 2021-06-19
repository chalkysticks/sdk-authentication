"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_core_1 = require("@chalkysticks/sdk-core");
const Jwt_1 = require("./Jwt");
const User_1 = require("./User");
class ModelAuthentication extends sdk_core_1.ModelBase {
    constructor() {
        super(...arguments);
        this.endpoint = 'auth/basic/login';
        this.fields = [
            'jwt',
            'user',
        ];
    }
    get jwt() {
        return this.hasOne('jwt', Jwt_1.default);
    }
    get user() {
        return this.hasOne('user', User_1.default);
    }
    login(email, password) {
        return this
            .post({ email, password })
            .then((e) => {
        });
    }
    loginSocial(provider = 'google') {
        const redirect_to = location.href;
        const redirect_url = 'http://localhost:3333/auth/' + provider + '/redirect?redirect_to=' + redirect_to;
        location.href = redirect_url;
    }
}
exports.default = ModelAuthentication;
//# sourceMappingURL=Authentication.js.map