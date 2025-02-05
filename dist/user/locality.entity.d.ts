import { Collection, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { User } from './user.entity.js';
import { Province } from './province.entity.js';
export declare class Locality extends BaseEntity {
    name: string;
    postalCode: number;
    users: Collection<User, object>;
    province: Rel<Province>;
}
