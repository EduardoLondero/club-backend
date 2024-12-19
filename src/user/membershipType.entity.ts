import {
    Entity,
    OneToMany,
    ManyToMany,
    Property,
    Cascade,
    Collection,
    ManyToOne,
    Rel,
  } from '@mikro-orm/core'
import { BaseEntity } from '../shared/baseEntity.entity.js'
import { Membership } from './membership.entity.js'

@Entity()
  export class MembershipType extends BaseEntity {
    @Property({ nullable: false })
    description!: string

    @Property ({nullable:false})
    price!: number

    @OneToMany (() => Membership, (membership) => membership.type,{
        cascade: [Cascade.ALL],
      })
      memberships = new Collection <Membership>(this)
  }