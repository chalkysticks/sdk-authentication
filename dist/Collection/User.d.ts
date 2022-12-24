import { CollectionBase } from '@chalkysticks/sdk-core';
import ModelUser from '../Model/User';
export default class CollectionUser extends CollectionBase<ModelUser> {
    endpoint: string;
    model: ModelUser;
}
