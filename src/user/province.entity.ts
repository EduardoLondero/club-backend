import {
  Entity,
  Collection,
  Property,
  OneToMany,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Locality } from './locality.entity.js';

@Entity({ tableName: 'Provincia', schema: 'dbo' })
export class Province extends BaseEntity {

  @Property({ fieldName: 'nombreProvincia', nullable: false })
  nameprovince!: string;

  @OneToMany(() => Locality, (locality) => locality.province)
  localities = new Collection<Locality>(this);
}
