import { DateTimeType, Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';

@Entity({ tableName: 'Rol', schema: 'dbo' })
export class Role extends BaseEntity {
  @Property({ fieldName: 'descripcionrol', nullable: false })
  descriptionRole!: string;

  @Property({ fieldName: 'fechacreacionrol', nullable: false })
  dateRole!: string;
}
