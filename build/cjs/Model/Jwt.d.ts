import { ModelBase } from '@chalkysticks/sdk-core';
export default class ModelJwt extends ModelBase {
    fields: string[];
    getToken(): string;
    getType(): string;
}
