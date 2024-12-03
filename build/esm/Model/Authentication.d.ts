import { Jwt } from './Jwt';
import { Model } from '@chalkysticks/sdk-core';
export declare class Authentication extends Model.Base {
    endpoint: string;
    fields: string[];
    get jwt(): Jwt;
    get user(): Model.User;
    isLoggedIn(): boolean;
    login(email: string, password: string): Promise<Model.User>;
    loginWithToken(token: string): Promise<Model.User>;
    loginSocial(provider?: string, redirectTo?: string): void;
    loginWithGoogle(redirectTo?: string): void;
    loginWithFacebook(redirectTo?: string): void;
    protected handleResponse(response?: any): Model.User;
    protected handleError(response?: any): any;
    static getAuthToken(): string;
}
