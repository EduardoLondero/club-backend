import {
  Entity,
  Property,
  ManyToOne,
  OneToMany,
  Collection,
  Cascade,
  Rel,
  DateTimeType,
} from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Locality } from './locality.entity.js';
import { Membership } from './membership.entity.js';
import { Role } from './role.entity.js';

@Entity({ tableName: 'Usuario', schema: 'dbo' })
export class User extends BaseEntity {

  @Property({ fieldName: 'dni', nullable: false })
  dni!: number;
  
  @Property({ fieldName: 'nombreCompleto', nullable: false })
  fullName!: string;

  @Property({ fieldName: 'sexo', nullable: false })
  sex!: string;

  @Property({ fieldName: 'fechaNacimiento', nullable: false })
  birthDate!: string;

  @Property({ fieldName: 'email', nullable: false })
  email!: string;

  @Property({ fieldName: 'telefono', nullable: true })
  numberPhone!: string;

  @Property({ fieldName: 'contraseña', nullable: false })
  password!: string;

  @Property({ fieldName: 'direccion', nullable: false })
  address!: string;

  @ManyToOne(() => Locality, { fieldName: 'oLocalidadId', nullable: false })
  locality!: Rel<Locality>;

  @OneToMany(() => Membership, (membership) => membership.user, {
    cascade: [Cascade.ALL],
  })
  memberships = new Collection<Membership>(this);

  @ManyToOne(() => Role, { fieldName: 'oRolId', nullable: false })
  role!: Rel<Role>;
}
