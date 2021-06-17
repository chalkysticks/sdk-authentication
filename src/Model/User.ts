import { Model } from 'eloquent-js';

export default class User extends Model {
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
        'password',
        'activation_key',
        'phone',
        'latitude',
        'longitude',
        'status',
        'permissions',
        'created_at',
        'updated_at',
    ];
}
