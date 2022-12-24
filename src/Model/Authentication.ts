import { ModelBase, ModelUser, StoreProvider } from '@chalkysticks/sdk-core';
import { Request } from 'restmc';
import ModelJwt from './Jwt';

/**
 * @class ModelUser
 * @package Model
 * @project ChalkySticks SDK Authentication
 */
export default class ModelAuthentication extends ModelBase {
    /**
     * Endpoint key
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
     public fields: string[] = [
        'jwt',
        'user',
    ];

    // region: Relationships
    // ---------------------------------------------------------------------------

    public get jwt(): ModelJwt {
        return this.hasOne('jwt', ModelJwt);
    }

    public get user(): ModelUser {
        return this.hasOne('user', ModelUser);
    }

    // endregion: Relationships

    // region: Actions
    // ---------------------------------------------------------------------------

    /**
     * Login via basic
     *
     * @param string provider
     * @return Promise<Request>
     */
    public async login(email: string, password: string): Promise<ModelUser> {
		return new Promise((resolve, reject) => {
        	this.post({ email, password })
				.then((request: Request) => {
					const permissions: string = request.response?.data.permissions;
					const token: string = request.response?.data.token;
					const userModel: ModelUser = ModelUser.hydrate(request.response?.data.user) as ModelUser;

					// Save token
					StoreProvider.get().state.token = token;

					// Resolve user
					resolve(userModel);
				})
				.catch((request: Request) => {
					const errorData = request.response?.data;
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
