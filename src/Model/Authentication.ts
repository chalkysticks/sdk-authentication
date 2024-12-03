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
					const userModel: Model.User = this.handleResponse(request.response || {});
					resolve(userModel);
				})
				.catch((request: Request) => {
					const errorData = this.handleError(request.response || {});
					reject(errorData);
				});
		});
	}

	/**
	 * When we get a token from Social auth, send it to
	 * login-with-token and that's how we login
	 *
	 * @param string token
	 * @return Promise<Model.User>
	 */
	public async loginWithToken(token: string): Promise<Model.User> {
		return new Promise((resolve, reject) => {
			this.endpoint = 'auth/login-with-token';

			this.setHeader('Authorization', `Bearer ${token}`);

			this.post()
				.then((request: Request) => {
					const userModel: Model.User = this.handleResponse(request.response || {});
					resolve(userModel);
				})
				.catch((request: Request) => {
					const errorData = this.handleError(request.response || {});
					reject(errorData);
				});
		});
	}

	/**
	 * Login via social network
	 *
	 * @param string provider
	 * @param string redirectTo
	 * @return void
	 */
	public loginSocial(provider: string = 'google', redirectTo: string = '/'): void {
		const baseUrl: string = this.baseUrl;
		const authenticationUrl: string = `${baseUrl}/auth/${provider}?redirectTo=${encodeURIComponent(redirectTo)}`;

		location.href = authenticationUrl;
	}

	/**
	 * Login with Google
	 *
	 * @param string redirectTo
	 * @return void
	 */
	public loginWithGoogle(redirectTo: string = '/'): void {
		this.loginSocial('google', redirectTo);
	}

	/**
	 * Login with Facebook
	 *
	 * @param string redirectTo
	 * @return void
	 */
	public loginWithFacebook(redirectTo: string = '/'): void {
		this.loginSocial('facebook', redirectTo);
	}

	// endregion: Actions

	/**
	 * Handle response
	 *
	 * @param any data
	 * @return Model.User
	 */
	protected handleResponse(response: any = {}): Model.User {
		const permissions: string = response?.data.permissions;
		const token: string = response?.data.token;
		const userModel: Model.User = Model.User.hydrate(response?.data.user) as Model.User;

		// Set model data
		this.set({
			jwt: {
				permissions: permissions,
				token: token,
			},
			user: userModel,
		});

		// Save assets directly AND through dispatch (intentional fallback flow)
		const store: IStore = Provider.Store.get();
		store.state.token = token;
		store.state.user = response?.data.user;
		store.dispatch('authentication/login', {
			token: token,
			user: response?.data.user,
		});

		// Trigger events
		this.trigger('login', { userModel });
		this.trigger('success', { userModel });

		return userModel;
	}

	/**
	 * Handle error
	 *
	 * @param any data
	 * @return any
	 */
	protected handleError(response: any = {}): any {
		const errorData = Object.assign(response.data, {
			code: response.status || 0,
		});

		// Trigger events
		this.trigger('login:error', { error: errorData });
		this.trigger('error', { error: errorData });

		return errorData;
	}

	// region: Static Methods
	// ---------------------------------------------------------------------------

	/**
	 * Check if we should login with token
	 *
	 * @return string
	 */
	public static getAuthToken(): string {
		const token = new URLSearchParams(location.search).get('token');

		return token || '';
	}

	// endregion: Static Methods
}
