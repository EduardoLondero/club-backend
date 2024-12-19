import {
    Entity,
    OneToMany,
    ManyToOne,
    ManyToMany,
    Property,
    Cascade,
    Collection,
    Rel
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/baseEntity.entity.js'
  import { Locality } from './locality.entity.js'
 
  
  @Entity()
  export class Neighbourhood extends BaseEntity {
    @Property({ nullable: false })
    name!: string

    @ManyToOne(() => Locality, { nullable: false })
    locality!: Rel<Locality>;


  }