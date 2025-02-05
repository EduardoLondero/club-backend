import { Collection } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Membership } from './membership.entity.js';
export declare class Sport extends BaseEntity {
    sportName: string;
    schedule?: string;
    scheduleEnd?: string;
    imageUrl?: string;
    price?: number;
    memberships: Collection<Membership, object>;
}
