import { ModelBase } from '@chalkysticks/sdk-core';


/**
 * @class ModelJwt
 * @package Model
 * @project ChalkySticks SDK Authentication
 */
export default class ModelJwt extends ModelBase {
    /**
     * List of fields available
     *
     * @type string[]
     */
    public fields: string[] = [
        'token',
        'type',
    ];


    // region: Getters
    // ---------------------------------------------------------------------------

    /**
     * @return string
     */
    public getToken(): string {
        return this.attr('token') as string;
    }

    /**
     * e.g. bearer
     *
     * @return string
     */
    public getType(): string {
        return this.attr('type') as string;
    }

    // endregion: Getters
}
