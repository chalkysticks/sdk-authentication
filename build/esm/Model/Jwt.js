import { Model } from '@chalkysticks/sdk-core';
export class Jwt extends Model.Base {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSnd0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL01vZGVsL0p3dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFPL0MsTUFBTSxPQUFPLEdBQUksU0FBUSxLQUFLLENBQUMsSUFBSTtJQUFuQzs7UUFNVyxXQUFNLEdBQWE7WUFDdEIsT0FBTztZQUNQLE1BQU07U0FDVCxDQUFDO0lBdUJOLENBQUM7SUFkVSxRQUFRO1FBQ1gsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBVyxDQUFDO0lBQ3hDLENBQUM7SUFPTSxPQUFPO1FBQ1YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBVyxDQUFDO0lBQ3ZDLENBQUM7Q0FHSiJ9