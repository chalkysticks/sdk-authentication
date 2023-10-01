import { Model } from '@chalkysticks/sdk-core';
export declare class Jwt extends Model.Base {
    fields: string[];
    getToken(): string;
    getType(): string;
}
