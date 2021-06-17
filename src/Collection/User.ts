import { CollectionBase } from '@chalkysticks/sdk-core';
import ModelUser from '../Model/User';

/**
 * ┌────────────────────────────────────────────────────────────────────────────┐
 * │                                                                            │
 * │ CollectionUser                                                             │
 * │                                                                            │
 * │ @namespace Collection                                                      │
 * │ @package   SDK-Authentication                                              │
 * │ @project   ChalkySticks                                                    │
 * │                                                                            │
 * └────────────────────────────────────────────────────────────────────────────┘
 */
export default class CollectionUser extends CollectionBase {
    /**
     * Endpoint key
     * e.g. https://api.chalkysticks.com/v1/user
     *
     * @type string
     */
    public endpoint: string = 'user';

    /**
     * Model object instantiated by this collection
     *
     * @type ModelUser
     */
    public model: any = ModelUser;
}
