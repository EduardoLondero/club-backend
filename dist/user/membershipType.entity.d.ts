import { Collection } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Membership } from './membership.entity.js';
export declare class MembershipType extends BaseEntity {
    description: string;
    price: number;
    benefits: string;
    requirements: string;
    memberships: Collection<Membership, object>;
}
