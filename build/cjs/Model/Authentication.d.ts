import { ModelBase, ModelUser } from '@chalkysticks/sdk-core';
import ModelJwt from './Jwt';
export default class ModelAuthentication extends ModelBase {
    endpoint: string;
    fields: string[];
    get jwt(): ModelJwt;
    get user(): ModelUser;
    login(email: string, password: string): Promise<ModelUser>;
    loginSocial(provider?: string): void;
}
