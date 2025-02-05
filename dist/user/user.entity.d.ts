import { Collection, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Locality } from './locality.entity.js';
import { Membership } from './membership.entity.js';
import { Role } from './role.entity.js';
export declare class User extends BaseEntity {
    dni: number;
    fullName: string;
    sex: string;
    birthDate: string;
    email: string;
    numberPhone: string;
    password: string;
    address: string;
    locality: Rel<Locality>;
    memberships: Collection<Membership, object>;
    role: Rel<Role>;
}
