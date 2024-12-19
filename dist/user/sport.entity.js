var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, ManyToMany, Property, Collection } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Membership } from './membership.entity.js';
let Sport = class Sport extends BaseEntity {
    constructor() {
        super(...arguments);
        this.memberships = new Collection(this);
    }
};
__decorate([
    Property({ nullable: false }),
    __metadata("design:type", String)
], Sport.prototype, "sportName", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", String)
], Sport.prototype, "schedule", void 0);
__decorate([
    Property({ nullable: true }),
    __metadata("design:type", Number)
], Sport.prototype, "price", void 0);
__decorate([
    ManyToMany(() => Membership, (membership) => membership.sports),
    __metadata("design:type", Object)
], Sport.prototype, "memberships", void 0);
Sport = __decorate([
    Entity()
], Sport);
export { Sport };
//# sourceMappingURL=sport.entity.js.map