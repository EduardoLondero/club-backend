var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, OneToMany, Property, Cascade, Collection, } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Membership } from './membership.entity.js';
let MembershipType = class MembershipType extends BaseEntity {
    constructor() {
        super(...arguments);
        this.memberships = new Collection(this);
    }
};
__decorate([
    Property({ fieldName: 'descripcion', nullable: false }),
    __metadata("design:type", String)
], MembershipType.prototype, "description", void 0);
__decorate([
    Property({ fieldName: 'precioMembresia', nullable: false }),
    __metadata("design:type", Number)
], MembershipType.prototype, "price", void 0);
__decorate([
    Property({ fieldName: 'beneficios', nullable: false }),
    __metadata("design:type", String)
], MembershipType.prototype, "benefits", void 0);
__decorate([
    Property({ fieldName: 'requisitos', nullable: false }),
    __metadata("design:type", String)
], MembershipType.prototype, "requirements", void 0);
__decorate([
    OneToMany(() => Membership, (membership) => membership.type, {
        cascade: [Cascade.ALL],
    }),
    __metadata("design:type", Object)
], MembershipType.prototype, "memberships", void 0);
MembershipType = __decorate([
    Entity({ tableName: 'Tipo_Membresia', schema: 'dbo' })
], MembershipType);
export { MembershipType };
//# sourceMappingURL=membershipType.entity.js.map