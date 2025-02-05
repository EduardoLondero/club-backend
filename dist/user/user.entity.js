var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, Property, ManyToOne, OneToMany, Collection, Cascade, } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Locality } from './locality.entity.js';
import { Membership } from './membership.entity.js';
import { Role } from './role.entity.js';
let User = class User extends BaseEntity {
    constructor() {
        super(...arguments);
        this.memberships = new Collection(this);
    }
};
__decorate([
    Property({ fieldName: 'dni', nullable: false }),
    __metadata("design:type", Number)
], User.prototype, "dni", void 0);
__decorate([
    Property({ fieldName: 'nombreCompleto', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    Property({ fieldName: 'sexo', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "sex", void 0);
__decorate([
    Property({ fieldName: 'fechaNacimiento', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "birthDate", void 0);
__decorate([
    Property({ fieldName: 'email', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Property({ fieldName: 'telefono', nullable: true }),
    __metadata("design:type", String)
], User.prototype, "numberPhone", void 0);
__decorate([
    Property({ fieldName: 'contraseña', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    Property({ fieldName: 'direccion', nullable: false }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    ManyToOne(() => Locality, { fieldName: 'oLocalidadId', nullable: false }),
    __metadata("design:type", Object)
], User.prototype, "locality", void 0);
__decorate([
    OneToMany(() => Membership, (membership) => membership.user, {
        cascade: [Cascade.ALL],
    }),
    __metadata("design:type", Object)
], User.prototype, "memberships", void 0);
__decorate([
    ManyToOne(() => Role, { fieldName: 'oRolId', nullable: false }),
    __metadata("design:type", Object)
], User.prototype, "role", void 0);
User = __decorate([
    Entity({ tableName: 'Usuario', schema: 'dbo' })
], User);
export { User };
//# sourceMappingURL=user.entity.js.map