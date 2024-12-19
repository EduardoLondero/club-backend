var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, OneToMany, ManyToMany, Property, Cascade, Collection, ManyToOne, } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { User } from './user.entity.js';
import { MembershipType } from './membershipType.entity.js';
import { Payment } from './payment.entity.js';
import { Sport } from './sport.entity.js';
let Membership = class Membership extends BaseEntity {
    constructor() {
        super(...arguments);
        this.payments = new Collection(this);
        this.sports = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Membership.prototype, "membershipNumber", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Membership.prototype, "startDate", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", String)
], Membership.prototype, "endDate", void 0);
__decorate([
    ManyToOne(() => User, { nullable: false }),
    __metadata("design:type", Object)
], Membership.prototype, "user", void 0);
__decorate([
    ManyToOne(() => MembershipType, { nullable: false }),
    __metadata("design:type", Object)
], Membership.prototype, "type", void 0);
__decorate([
    OneToMany(() => Payment, (payment) => payment.membership, {
        cascade: [Cascade.ALL]
    }),
    __metadata("design:type", Object)
], Membership.prototype, "payments", void 0);
__decorate([
    ManyToMany(() => Sport, (sport) => sport.memberships, {
        cascade: [Cascade.ALL],
        owner: true,
    }),
    __metadata("design:type", Object)
], Membership.prototype, "sports", void 0);
Membership = __decorate([
    Entity()
], Membership);
export { Membership };
//# sourceMappingURL=membership.entity.js.map