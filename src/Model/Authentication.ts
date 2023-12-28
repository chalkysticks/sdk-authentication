import { Jwt } from './Jwt';
import { Model, Provider, Request } from '@chalkysticks/sdk-core';

/**
 * @class Authentication
 * @package Model
 * @project ChalkySticks SDK Authentication
 */
export class Authentication extends Model.Base {
	/**
	 * e.g. https://api.chalkysticks.com/v3/auth/basic/login
	 *
	 * @type string
	 */
	public endpoint: string = 'auth/login';

	/**
	 * List of fields available
	 *
	 * @type string[]
	 */
	public fields: string[] = ['jwt', 'user'];

	// region: Relationships
	// ---------------------------------------------------------------------------

	public get jwt(): Jwt {
		return this.hasOne<Jwt>('jwt', Jwt);
	}

	public get user(): Model.User {
		return this.hasOne<Model.User>('user', Model.User);
	}

	// endregion: Relationships

	// region: Getters
	// ---------------------------------------------------------------------------

	/**
	 * @return boolean
	 */
	public isLoggedIn(): boolean {
		return !!this.user?.id;
	}

	// endregion: Getters

	// region: Actions
	// ---------------------------------------------------------------------------

	/**
	 * Login via basic
	 *
	 * @param string provider
	 * @return Promise<Request>
	 */
	public async login(email: string, password: string): Promise<Model.User> {
		return new Promise((resolve, reject) => {
			this.post({ email, password })
				.then((request: Request) => {
					const permissions: string = request.response?.data.permissions;
					const token: string = request.response?.data.token;
					const userModel: Model.User = Model.User.hydrate(request.response?.data.user) as Model.User;

					// Save token
					Provider.Store.get().state.token = token;

					// Trigger events
					this.trigger('login', { userModel });

					// Resolve user
					resolve(userModel);
				})
				.catch((request: Request) => {
					const errorData = Object.assign(request.response?.data, {
						code: request.response?.status || 0,
					});

					// Trigger events
					this.trigger('login:error', { error: errorData });

					// Reject user
					reject(errorData);
				});
		});
	}

	/**
	 * Login via social network
	 *
	 * @todo @critical Swap out localhost URL
	 *
	 * @param string provider
	 * @return void
	 */
	public loginSocial(provider: string = 'google'): void {
		const redirect_to: string = location.href;
		const redirect_url: string = 'http://localhost:3333/auth/' + provider + '/redirect?redirect_to=' + redirect_to;

		location.href = redirect_url;
	}

	// endregion: Actions
}
