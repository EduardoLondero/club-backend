import {
  Entity,
  OneToMany,
  Property,
  Cascade,
  Collection,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Membership } from './membership.entity.js';

@Entity({ tableName: 'Tipo_Membresia', schema: 'dbo' })
export class MembershipType extends BaseEntity {
  @Property({ fieldName: 'descripcion', nullable: false })
  description!: string;

  @Property({ fieldName: 'precioMembresia', nullable: false })
  price!: number;

  @Property({ fieldName: 'beneficios', nullable: false })
  benefits!: string;

  @Property({ fieldName: 'requisitos', nullable: false })
  requirements!: string;

  @OneToMany(() => Membership, (membership) => membership.type, {
    cascade: [Cascade.ALL],
  })
  memberships = new Collection<Membership>(this);
}
