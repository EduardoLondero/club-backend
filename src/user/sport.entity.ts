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
  export class Sport extends BaseEntity {
    @Property({ nullable: false })
    sportName!: string

    @Property({ nullable: true })
    schedule!: string

    @Property ({nullable: true})
    price!: number

    @ManyToMany(() => Membership, (membership) => membership.sports)
    memberships = new Collection <Membership> (this)
  }