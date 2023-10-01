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
exports.Authentication = void 0;
const Jwt_1 = require("./Jwt");
const sdk_core_1 = require("@chalkysticks/sdk-core");
class Authentication extends sdk_core_1.Model.Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'auth/login';
        this.fields = [
            'jwt',
            'user',
        ];
    }
    get jwt() {
        return this.hasOne('jwt', Jwt_1.Jwt);
    }
    get user() {
        return this.hasOne('user', sdk_core_1.Model.User);
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
                    const userModel = sdk_core_1.Model.User.hydrate((_c = request.response) === null || _c === void 0 ? void 0 : _c.data.user);
                    sdk_core_1.Provider.Store.get().state.token = token;
                    this.trigger('login', { userModel });
                    resolve(userModel);
                })
                    .catch((request) => {
                    var _a, _b;
                    const errorData = Object.assign((_a = request.response) === null || _a === void 0 ? void 0 : _a.data, {
                        code: ((_b = request.response) === null || _b === void 0 ? void 0 : _b.status) || 0,
                    });
                    this.trigger('login:error', { error: errorData });
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
exports.Authentication = Authentication;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvTW9kZWwvQXV0aGVudGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsK0JBQTRCO0FBQzVCLHFEQUF5RDtBQVF6RCxNQUFhLGNBQWUsU0FBUSxnQkFBSyxDQUFDLElBQUk7SUFBOUM7O1FBTVcsYUFBUSxHQUFXLFlBQVksQ0FBQztRQU8vQixXQUFNLEdBQWE7WUFDdkIsS0FBSztZQUNMLE1BQU07U0FDVCxDQUFDO0lBbUZOLENBQUM7SUE5RUcsSUFBVyxHQUFHO1FBQ1YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFNLEtBQUssRUFBRSxTQUFHLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ1gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFhLE1BQU0sRUFBRSxnQkFBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFVRyxVQUFVOztRQUNoQixPQUFPLENBQUMsQ0FBQyxDQUFBLE1BQUEsSUFBSSxDQUFDLElBQUksMENBQUUsRUFBRSxDQUFBLENBQUM7SUFDeEIsQ0FBQztJQWFlLEtBQUssQ0FBQyxLQUFhLEVBQUUsUUFBZ0I7O1lBQ3BELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUM7cUJBQzVCLElBQUksQ0FBQyxDQUFDLE9BQWdCLEVBQUUsRUFBRTs7b0JBQzFCLE1BQU0sV0FBVyxHQUFXLE1BQUEsT0FBTyxDQUFDLFFBQVEsMENBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQztvQkFDL0QsTUFBTSxLQUFLLEdBQVcsTUFBQSxPQUFPLENBQUMsUUFBUSwwQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUNuRCxNQUFNLFNBQVMsR0FBZSxnQkFBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBQSxPQUFPLENBQUMsUUFBUSwwQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFlLENBQUM7b0JBRzVGLG1CQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO29CQUd6QyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7b0JBR3JDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDcEIsQ0FBQyxDQUFDO3FCQUNELEtBQUssQ0FBQyxDQUFDLE9BQWdCLEVBQUUsRUFBRTs7b0JBQzNCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBQSxPQUFPLENBQUMsUUFBUSwwQ0FBRSxJQUFJLEVBQUU7d0JBQ3ZELElBQUksRUFBRSxDQUFBLE1BQUEsT0FBTyxDQUFDLFFBQVEsMENBQUUsTUFBTSxLQUFJLENBQUM7cUJBQ25DLENBQUMsQ0FBQztvQkFHSCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO29CQUdsRCxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ25CLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDRCxDQUFDO0tBQUE7SUFVTSxXQUFXLENBQUMsV0FBbUIsUUFBUTtRQUMxQyxNQUFNLFdBQVcsR0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQzFDLE1BQU0sWUFBWSxHQUFXLDZCQUE2QixHQUFHLFFBQVEsR0FBRyx3QkFBd0IsR0FBRyxXQUFXLENBQUM7UUFFL0csUUFBUSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7SUFDakMsQ0FBQztDQUdKO0FBbkdELHdDQW1HQyJ9