import {
  Entity,
  OneToMany,
  Property,
  Cascade,
  Collection,
  ManyToOne,
  ManyToMany,
  Rel,
  DateTimeType,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { User } from './user.entity.js';
import { MembershipType } from './membershipType.entity.js';
import { Payment } from './payment.entity.js';
import { Sport } from './sport.entity.js';

@Entity({ tableName: 'Membresia', schema: 'dbo' })
export class Membership extends BaseEntity {
  @Property({ fieldName: 'fechaInicio', nullable: true })
  startDate?: string;

  @Property({ fieldName: 'fechaFin', nullable: true })
  endDate: string | null = null;

  @Property({ fieldName: 'fechaVencimiento', nullable: true })
  expireDate?: string;

  @ManyToOne(() => User, {fieldName: 'oUsuarioId', nullable: false })
  user!: Rel<User>;

  @ManyToOne(() => MembershipType, { fieldName: 'oTipo_MembresiaId', nullable: false }) 
  type!: Rel<MembershipType>;

  @ManyToMany(() => Sport, (sport) => sport.memberships, {
    cascade: [Cascade.ALL],
    owner: true,
    pivotTable: 'dbo.Membresia_Deporte',
    joinColumn: 'oMembresiaId',
    inverseJoinColumn: 'oDeporteId',
  })
  sports = new Collection<Sport>(this);

  @OneToMany(() => Payment, (payment) => payment.membership, {
    cascade: [Cascade.ALL],
  })
  payments = new Collection<Payment>(this);
}
