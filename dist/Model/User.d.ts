import { ModelBase } from '@chalkysticks/sdk-core';
export default class ModelUser extends ModelBase {
    endpoint: string;
    fields: string[];
    getEmail(): string;
    getLatitude(): number;
    getLongitude(): number;
    getName(): string;
    getPermissions(): number;
    getPhone(): string;
    getSlug(): string;
    getStatus(): number;
}
