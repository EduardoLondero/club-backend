import {
  DateTimeType,
  Entity,
  ManyToOne,
  Property,
  Rel,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Membership } from './membership.entity.js';

@Entity({ tableName: 'Pago', schema: 'dbo' })
export class Payment extends BaseEntity {
  @Property({ fieldName: 'estado', nullable: false })
  state!: string;

  @Property({ fieldName: 'fechaPago', nullable: true })
  payDay?: string;

  @Property({ fieldName: 'precioTotal', nullable: true })
  totalPrice?: number;

  @ManyToOne(() => Membership, { fieldName: 'oMembresiaId', nullable: false })
  membership!: Rel<Membership>;
}