import { Model } from '@chalkysticks/sdk-core';
export class Jwt extends Model.Base {
    constructor() {
        super(...arguments);
        this.fields = ['token', 'type'];
    }
    getToken() {
        return this.attr('token');
    }
    getType() {
        return this.attr('type');
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSnd0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL01vZGVsL0p3dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFPL0MsTUFBTSxPQUFPLEdBQUksU0FBUSxLQUFLLENBQUMsSUFBSTtJQUFuQzs7UUFNUSxXQUFNLEdBQWEsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFzQjdDLENBQUM7SUFkTyxRQUFRO1FBQ2QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBVyxDQUFDO0lBQ3JDLENBQUM7SUFPTSxPQUFPO1FBQ2IsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBVyxDQUFDO0lBQ3BDLENBQUM7Q0FHRCJ9