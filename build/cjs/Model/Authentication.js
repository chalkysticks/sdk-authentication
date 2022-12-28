"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_core_1 = require("@chalkysticks/sdk-core");
const Jwt_1 = require("./Jwt");
class ModelAuthentication extends sdk_core_1.ModelBase {
    constructor() {
        super(...arguments);
        this.endpoint = 'auth/login';
        this.fields = [
            'jwt',
            'user',
        ];
    }
    get jwt() {
        return this.hasOne('jwt', Jwt_1.default);
    }
    get user() {
        return this.hasOne('user', sdk_core_1.ModelUser);
    }
    isLoggedIn() {
        var _a;
        return !!((_a = this.user) === null || _a === void 0 ? void 0 : _a.id);
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.post({ email, password })
                    .then((request) => {
                    var _a, _b, _c;
                    const permissions = (_a = request.response) === null || _a === void 0 ? void 0 : _a.data.permissions;
                    const token = (_b = request.response) === null || _b === void 0 ? void 0 : _b.data.token;
                    const userModel = sdk_core_1.ModelUser.hydrate((_c = request.response) === null || _c === void 0 ? void 0 : _c.data.user);
                    sdk_core_1.StoreProvider.get().state.token = token;
                    resolve(userModel);
                })
                    .catch((request) => {
                    var _a;
                    const errorData = (_a = request.response) === null || _a === void 0 ? void 0 : _a.data;
                    reject(errorData);
                });
            });
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