import { ModelBase } from '@chalkysticks/sdk-core';
export default class ModelJwt extends ModelBase {
    fields = [
        'token',
        'type',
    ];
    getToken() {
        return this.attr('token');
    }
    getType() {
        return this.attr('type');
    }
}
//# sourceMappingURL=Jwt.js.map