"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Jwt = void 0;
const sdk_core_1 = require("@chalkysticks/sdk-core");
class Jwt extends sdk_core_1.Model.Base {
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
exports.Jwt = Jwt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSnd0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL01vZGVsL0p3dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBK0M7QUFPL0MsTUFBYSxHQUFJLFNBQVEsZ0JBQUssQ0FBQyxJQUFJO0lBQW5DOztRQU1XLFdBQU0sR0FBYTtZQUN0QixPQUFPO1lBQ1AsTUFBTTtTQUNULENBQUM7SUF1Qk4sQ0FBQztJQWRVLFFBQVE7UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFXLENBQUM7SUFDeEMsQ0FBQztJQU9NLE9BQU87UUFDVixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFXLENBQUM7SUFDdkMsQ0FBQztDQUdKO0FBaENELGtCQWdDQyJ9