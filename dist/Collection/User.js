"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_core_1 = require("@chalkysticks/sdk-core");
const User_1 = require("../Model/User");
class CollectionUser extends sdk_core_1.CollectionBase {
    constructor() {
        super(...arguments);
        this.endpoint = 'user';
        this.model = User_1.default;
    }
}
exports.default = CollectionUser;
//# sourceMappingURL=User.js.map