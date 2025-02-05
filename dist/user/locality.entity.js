var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, OneToMany, Property, Cascade, Collection, ManyToOne, } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { User } from './user.entity.js';
import { Province } from './province.entity.js';
let Locality = class Locality extends BaseEntity {
    constructor() {
        super(...arguments);
        this.users = new Collection(this);
    }
};
__decorate([
    Property({ fieldName: 'nombreLocalidad', nullable: false }),
    __metadata("design:type", String)
], Locality.prototype, "name", void 0);
__decorate([
    Property({ fieldName: 'codigoPostal', nullable: false }),
    __metadata("design:type", Number)
], Locality.prototype, "postalCode", void 0);
__decorate([
    OneToMany(() => User, (user) => user.locality, {
        cascade: [Cascade.ALL],
    }),
    __metadata("design:type", Object)
], Locality.prototype, "users", void 0);
__decorate([
    ManyToOne(() => Province, { fieldName: 'oProvinciaId', nullable: false }),
    __metadata("design:type", Object)
], Locality.prototype, "province", void 0);
Locality = __decorate([
    Entity({ tableName: 'Localidad', schema: 'dbo' })
], Locality);
export { Locality };
//# sourceMappingURL=locality.entity.js.map