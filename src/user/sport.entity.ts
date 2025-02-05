import {
  Entity,
  ManyToMany,
  Property,
  Collection,
  DateTimeType,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Membership } from './membership.entity.js';

@Entity(({ tableName: 'Deporte', schema: 'dbo' }))
export class Sport extends BaseEntity {
  @Property({ fieldName: 'nombreDeporte',nullable: false })
  sportName!: string;

  @Property({ fieldName: 'horainicio', nullable: false })
  schedule?: string;

  @Property({ fieldName: 'horaFin', nullable: false })
  scheduleEnd?: string;

  @Property({ fieldName: 'imageUrl', nullable: true })
  imageUrl?: string;

  @Property({ fieldName: 'precio', nullable: false })
  price?: number;

  @ManyToMany(() => Membership, (membership) => membership.sports, {
    pivotTable: 'dbo.Membresia_Deporte',
    joinColumn: 'oDeporteId',
    inverseJoinColumn: 'oMembresiaId',
  })
  memberships = new Collection<Membership>(this);
}
