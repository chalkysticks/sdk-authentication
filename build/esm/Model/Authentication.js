import { Jwt } from './Jwt';
import { Model, Provider } from '@chalkysticks/sdk-core';
export class Authentication extends Model.Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'auth/login';
        this.fields = [
            'jwt',
            'user',
        ];
    }
    get jwt() {
        return this.hasOne('jwt', Jwt);
    }
    get user() {
        return this.hasOne('user', Model.User);
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
                const userModel = Model.User.hydrate(request.response?.data.user);
                Provider.Store.get().state.token = token;
                this.trigger('login', { userModel });
                resolve(userModel);
            })
                .catch((request) => {
                const errorData = Object.assign(request.response?.data, {
                    code: request.response?.status || 0,
                });
                this.trigger('login:error', { error: errorData });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvTW9kZWwvQXV0aGVudGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUM1QixPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBUXpELE1BQU0sT0FBTyxjQUFlLFNBQVEsS0FBSyxDQUFDLElBQUk7SUFBOUM7O1FBTVcsYUFBUSxHQUFXLFlBQVksQ0FBQztRQU8vQixXQUFNLEdBQWE7WUFDdkIsS0FBSztZQUNMLE1BQU07U0FDVCxDQUFDO0lBbUZOLENBQUM7SUE5RUcsSUFBVyxHQUFHO1FBQ1YsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFNLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ1gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFhLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQVVHLFVBQVU7UUFDaEIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQWFTLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBYSxFQUFFLFFBQWdCO1FBQ3BELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQztpQkFDNUIsSUFBSSxDQUFDLENBQUMsT0FBZ0IsRUFBRSxFQUFFO2dCQUMxQixNQUFNLFdBQVcsR0FBVyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQy9ELE1BQU0sS0FBSyxHQUFXLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDbkQsTUFBTSxTQUFTLEdBQWUsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFlLENBQUM7Z0JBRzVGLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7Z0JBR3pDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztnQkFHckMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxPQUFnQixFQUFFLEVBQUU7Z0JBQzNCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUU7b0JBQ3ZELElBQUksRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLE1BQU0sSUFBSSxDQUFDO2lCQUNuQyxDQUFDLENBQUM7Z0JBR0gsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztnQkFHbEQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDRCxDQUFDO0lBVU0sV0FBVyxDQUFDLFdBQW1CLFFBQVE7UUFDMUMsTUFBTSxXQUFXLEdBQVcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUMxQyxNQUFNLFlBQVksR0FBVyw2QkFBNkIsR0FBRyxRQUFRLEdBQUcsd0JBQXdCLEdBQUcsV0FBVyxDQUFDO1FBRS9HLFFBQVEsQ0FBQyxJQUFJLEdBQUcsWUFBWSxDQUFDO0lBQ2pDLENBQUM7Q0FHSiJ9