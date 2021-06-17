import { Model } from 'eloquent-js';
export default class User extends Model {
    endpoint = 'user';
    fields = [
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
//# sourceMappingURL=User.js.map