import { Model } from 'eloquent-js';
export default class User extends Model {
    endpoint: string;
    fields: string[];
}
