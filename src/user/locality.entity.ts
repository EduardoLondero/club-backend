import {
  Entity,
  OneToMany,
  Property,
  Cascade,
  Collection,
  ManyToOne,
  Rel,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { User } from './user.entity.js';
import { Province } from './province.entity.js';

@Entity({ tableName: 'Localidad', schema: 'dbo' })
export class Locality extends BaseEntity {
  @Property({ fieldName: 'nombreLocalidad',nullable: false })
  name!: string;

  @Property({ fieldName: 'codigoPostal', nullable: false })
  postalCode!: number;

  @OneToMany(() => User, (user) => user.locality, {
    cascade: [Cascade.ALL],
  })
  users = new Collection<User>(this);

  @ManyToOne(() => Province, { fieldName: 'oProvinciaId', nullable: false })
  province!: Rel<Province>;
}
