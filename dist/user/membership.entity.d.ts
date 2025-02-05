import { Collection, Rel } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { User } from './user.entity.js';
import { MembershipType } from './membershipType.entity.js';
import { Payment } from './payment.entity.js';
import { Sport } from './sport.entity.js';
export declare class Membership extends BaseEntity {
    startDate?: string;
    endDate: string | null;
    expireDate?: string;
    user: Rel<User>;
    type: Rel<MembershipType>;
    sports: Collection<Sport, object>;
    payments: Collection<Payment, object>;
}
