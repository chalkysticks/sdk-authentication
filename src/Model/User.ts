import { ModelBase } from '@chalkysticks/sdk-core';

/**
 * ┌────────────────────────────────────────────────────────────────────────────┐
 * │                                                                            │
 * │ ModelUser                                                                  │
 * │                                                                            │
 * │ @namespace Model                                                           │
 * │ @package   SDK-Authentication                                              │
 * │ @project   ChalkySticks                                                    │
 * │                                                                            │
 * └────────────────────────────────────────────────────────────────────────────┘
 */
export default class ModelUser extends ModelBase {
    /**
     * Endpoint key
     * e.g. https://api.chalkysticks.com/v3/user
     *
     * @type string
     */
    public endpoint: string = 'user';

    /**
     * List of fields available
     *
     * @type string[]
     */
    public fields: string[] = [
        'id',
        'name',
        'slug',
        'email',
        'phone',
        'latitude',
        'longitude',
        'status',
        'permissions',
        'created_at',
        'updated_at',
    ];


    // region: Getters
    // ---------------------------------------------------------------------------

    /**
     * Retrieve User's email
     *
     * @return string
     */
    public getEmail(): string {
        return this.attr('email') as string;
    }

    /**
     * Retrieve User's Latitude
     *
     * @return number
     */
    public getLatitude(): number {
        return parseFloat(this.attr('latitude') as string);
    }

    /**
     * Retrieve User's Longitude
     *
     * @return number
     */
    public getLongitude(): number {
        return parseFloat(this.attr('longitude') as string);
    }

    /**
     * Retrieve User's name
     *
     * @return string
     */
    public getName(): string {
        return this.attr('name') as string;
    }

    /**
     * Retrieve User's permissions
     *
     * @return string
     */
    public getPermissions(): number {
        return parseFloat(this.attr('permissions') as string);
    }

    /**
     * Retrieve User's phone number
     *
     * @return string
     */
    public getPhone(): string {
        return this.attr('phone') as string;
    }

    /**
     * Retrieve User's slug
     *
     * @return string
     */
    public getSlug(): string {
        return this.attr('slug') as string;
    }

    /**
     * Retrieve User's status
     *
     * @return string
     */
    public getStatus(): number {
        return parseFloat(this.attr('status') as string);
    }

    // endregion: Getters
}
