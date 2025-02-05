import { Collection } from '@mikro-orm/core';
import { BaseEntity } from '../shared/baseEntity.entity.js';
import { Locality } from './locality.entity.js';
export declare class Province extends BaseEntity {
    nameprovince: string;
    localities: Collection<Locality, object>;
}
