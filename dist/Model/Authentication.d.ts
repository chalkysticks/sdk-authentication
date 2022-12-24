import { ModelBase } from '@chalkysticks/sdk-core';
import { Request } from 'restmc';
import ModelJwt from './Jwt';
import ModelUser from './User';
export default class ModelAuthentication extends ModelBase {
    endpoint: string;
    fields: string[];
    get jwt(): ModelJwt;
    get user(): ModelUser;
    login(email: string, password: string): Promise<Request>;
    loginSocial(provider?: string): void;
}
