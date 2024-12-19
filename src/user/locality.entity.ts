import {
    Entity,
    OneToMany,
    ManyToOne,
    ManyToMany,
    Property,
    Cascade,
    Collection,
  } from '@mikro-orm/core'
  import { BaseEntity } from '../shared/baseEntity.entity.js'
  import { User } from './user.entity.js'
  import { Neighbourhood } from './neighbourhood.entity.js'

  @Entity()
  export class Locality extends BaseEntity {
    @Property({ nullable: false })
    name!: string
  
    @Property({ nullable: false})
    postalCode!: number
  
    @OneToMany(() => User, (user) => user.locality, {
      cascade: [Cascade.ALL],
    })
    users= new Collection<User>(this)

    @OneToMany (() => Neighbourhood, (neighbourhood) => neighbourhood.locality,{
      cascade: [Cascade.ALL],
    })
    neighbourhoods = new Collection <Neighbourhood>(this)


  }