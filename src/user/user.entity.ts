import {
    Entity,
    Property,
    ManyToMany,
    Cascade,
    ManyToOne,
    Rel,
    Collection,
    OneToMany,
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/baseEntity.entity.js'
  import { Locality } from './locality.entity.js'
  import { Membership } from './membership.entity.js'

  enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    MODERATOR = 'moderator',
  }

  @Entity()
  export class User extends BaseEntity {
    @Property({ nullable: false })
    name!: string
  
    @Property({ nullable: false })
    email!: string
  
    @Property({ nullable: true })
    numberPhone!: string
  
    @Property({ nullable: false })
    password!: string
  
    @Property({ nullable: false })
    adress!: string
  
    @ManyToOne(() => Locality, { nullable: true })
    locality!: Rel<Locality>;

    @OneToMany (() => Membership, (membership) => membership.user,{
      cascade: [Cascade.ALL],
    })
    memberships = new Collection <Membership>(this)

    @Property({ type: 'string', nullable: false })
      role: UserRole = UserRole.USER;
  } 
