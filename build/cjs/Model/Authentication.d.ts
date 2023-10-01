import { Jwt } from './Jwt';
import { Model } from '@chalkysticks/sdk-core';
export declare class Authentication extends Model.Base {
    endpoint: string;
    fields: string[];
    get jwt(): Jwt;
    get user(): Model.User;
    isLoggedIn(): boolean;
    login(email: string, password: string): Promise<Model.User>;
    loginSocial(provider?: string): void;
}
