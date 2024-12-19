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
  import { Membership } from './membership.entity.js'
  
  @Entity()
  export class Payment extends BaseEntity {
    @Property({ nullable: false })
    state!: string

    @Property({ nullable: true })
    payDay!: string

    @ManyToOne(() => Membership, { nullable: false })
    membership!: Rel<Membership>;

  }