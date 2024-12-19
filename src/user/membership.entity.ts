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
  import { User } from './user.entity.js'
  import { MembershipType } from './membershipType.entity.js'
  import { Payment } from './payment.entity.js'
  import { Sport } from './sport.entity.js'

  @Entity()
  export class Membership extends BaseEntity {
    @Property({ nullable: false })
    membershipNumber!: string
  
    @Property({ nullable: false })
    startDate!: string
  
    @Property({ nullable: true })
    endDate!: string

    @ManyToOne (()=> User, {nullable: false})
    user!: Rel<User>

    @ManyToOne (()=>  MembershipType, {nullable: false} )
    type!: Rel<MembershipType>

    @OneToMany (()=> Payment, (payment) => payment.membership,{
      cascade:[Cascade.ALL]
    })
    payments = new Collection<Payment>(this)

    @ManyToMany(() => Sport, (sport) => sport.memberships, {
      cascade: [Cascade.ALL],
      owner: true,
    })
    sports = new Collection <Sport> (this)
    
  }