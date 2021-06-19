"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_core_1 = require("@chalkysticks/sdk-core");
class ModelJwt extends sdk_core_1.ModelBase {
    constructor() {
        super(...arguments);
        this.fields = [
            'token',
            'type',
        ];
    }
    getToken() {
        return this.attr('token');
    }
    getType() {
        return this.attr('type');
    }
}
exports.default = ModelJwt;
//# sourceMappingURL=Jwt.js.map