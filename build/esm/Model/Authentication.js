import { Jwt } from './Jwt';
import { Model, Provider } from '@chalkysticks/sdk-core';
export class Authentication extends Model.Base {
    constructor() {
        super(...arguments);
        this.endpoint = 'auth/login';
        this.fields = ['jwt', 'user'];
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
                const store = Provider.Store.get();
                store.state.token = token;
                store.state.user = request.response?.data.user;
                store.dispatch('authentication/login', {
                    token: token,
                    user: request.response?.data.user,
                });
                this.trigger('login', { userModel });
                this.trigger('success', { userModel });
                resolve(userModel);
            })
                .catch((request) => {
                const errorData = Object.assign(request.response?.data, {
                    code: request.response?.status || 0,
                });
                this.trigger('login:error', { error: errorData });
                this.trigger('error', { error: errorData });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aGVudGljYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvTW9kZWwvQXV0aGVudGljYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLE9BQU8sQ0FBQztBQUM1QixPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBVyxNQUFNLHdCQUF3QixDQUFDO0FBT2xFLE1BQU0sT0FBTyxjQUFlLFNBQVEsS0FBSyxDQUFDLElBQUk7SUFBOUM7O1FBTVEsYUFBUSxHQUFXLFlBQVksQ0FBQztRQU9oQyxXQUFNLEdBQWEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUEyRjNDLENBQUM7SUF0RkEsSUFBVyxHQUFHO1FBQ2IsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFNLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsSUFBVyxJQUFJO1FBQ2QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFhLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQVVNLFVBQVU7UUFDaEIsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQWFNLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBYSxFQUFFLFFBQWdCO1FBQ2pELE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQztpQkFDNUIsSUFBSSxDQUFDLENBQUMsT0FBZ0IsRUFBRSxFQUFFO2dCQUMxQixNQUFNLFdBQVcsR0FBVyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQy9ELE1BQU0sS0FBSyxHQUFXLE9BQU8sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDbkQsTUFBTSxTQUFTLEdBQWUsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFlLENBQUM7Z0JBRzVGLE1BQU0sS0FBSyxHQUFXLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBQzNDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDMUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUMvQyxLQUFLLENBQUMsUUFBUSxDQUFDLHNCQUFzQixFQUFFO29CQUN0QyxLQUFLLEVBQUUsS0FBSztvQkFDWixJQUFJLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSTtpQkFDakMsQ0FBQyxDQUFDO2dCQUdILElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztnQkFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO2dCQUd2QyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDO2lCQUNELEtBQUssQ0FBQyxDQUFDLE9BQWdCLEVBQUUsRUFBRTtnQkFDM0IsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLElBQUksRUFBRTtvQkFDdkQsSUFBSSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsTUFBTSxJQUFJLENBQUM7aUJBQ25DLENBQUMsQ0FBQztnQkFHSCxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO2dCQUc1QyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFVTSxXQUFXLENBQUMsV0FBbUIsUUFBUTtRQUM3QyxNQUFNLFdBQVcsR0FBVyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQzFDLE1BQU0sWUFBWSxHQUFXLDZCQUE2QixHQUFHLFFBQVEsR0FBRyx3QkFBd0IsR0FBRyxXQUFXLENBQUM7UUFFL0csUUFBUSxDQUFDLElBQUksR0FBRyxZQUFZLENBQUM7SUFDOUIsQ0FBQztDQUdEIn0=