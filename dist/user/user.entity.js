var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, Cascade, ManyToOne, Collection, OneToMany, } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Locality } from './locality.entity.js';
import { Membership } from './membership.entity.js';
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "admin";
    UserRole["USER"] = "user";
    UserRole["MODERATOR"] = "moderator";
})(UserRole || (UserRole = {}));
let User = class User extends BaseEntity {
    constructor() {
        super(...arguments);
        this.memberships = new Collection(this);
        this.role = UserRole.USER;
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "numberPhone", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], User.prototype, "adress", void 0);
__decorate([
    ManyToOne(() => Locality, { nullable: true }),
    __metadata("design:type", Object)
], User.prototype, "locality", void 0);
__decorate([
    OneToMany(() => Membership, (membership) => membership.user, {
        cascade: [Cascade.ALL],
    }),
    __metadata("design:type", Object)
], User.prototype, "memberships", void 0);
__decorate([
    Property({ type: 'string', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
User = __decorate([
    Entity()
], User);
export { User };
//# sourceMappingURL=user.entity.js.map