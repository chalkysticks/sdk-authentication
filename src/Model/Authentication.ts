import { ModelBase } from '@chalkysticks/sdk-core';
import ModelJwt from './Jwt';
import ModelUser from './User';

/**
 * ┌────────────────────────────────────────────────────────────────────────────┐
 * │                                                                            │
 * │ ModelAuthentication                                                        │
 * │                                                                            │
 * │ @namespace Model                                                           │
 * │ @package   SDK-Authentication                                              │
 * │ @project   ChalkySticks                                                    │
 * │                                                                            │
 * └────────────────────────────────────────────────────────────────────────────┘
 */
export default class ModelAuthentication extends ModelBase {
    /**
     * Endpoint key
     * e.g. https://api.chalkysticks.com/v3/diagram
     *
     * @type string
     */
    public endpoint: string = 'auth/basic/login';

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
     * @return void
     */
    public login(email: string, password: string): Promise<any> {
        return this
            .post({ email, password })
            .then((e) => {
                // console.log('sup bro', e);
            });
    }

    /**
     * Login via social network
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
