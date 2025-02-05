import { PrimaryKey, SerializedPrimaryKey, Property } from '@mikro-orm/core'

export abstract class BaseEntity {
  @PrimaryKey()
  id?: number

}
