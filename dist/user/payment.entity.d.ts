import { Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Membership } from './membership.entity.js';
export declare class Payment extends BaseEntity {
    state: string;
    payDay?: string;
    totalPrice?: number;
    membership: Rel<Membership>;
}
