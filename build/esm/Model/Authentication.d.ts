import { Jwt } from './Jwt';
import { Model } from '@chalkysticks/sdk-core';
export interface IAuthenticationSignupOptions {
    email: string;
    name: string;
    password: string;
    password_confirmation: string;
}
export declare class Authentication extends Model.Base {
    endpoint: string;
    fields: string[];
    get jwt(): Jwt;
    get user(): Model.User;
    isLoggedIn(): boolean;
    changePassword(currentPassword: string, newPassword: string, newPasswordConfirmation: string): Promise<void>;
    login(email: string, password: string): Promise<Model.User>;
    loginWithToken(token: string): Promise<Model.User>;
    loginSocial(provider?: string, redirectTo?: string): Promise<void>;
    loginWithGoogle(redirectTo?: string): void;
    loginWithFacebook(redirectTo?: string): void;
    signup(options: IAuthenticationSignupOptions): Promise<Model.User>;
    protected handleResponse(response?: any): Model.User;
    protected handleError(response?: any): any;
    static getAuthToken(): string;
}
