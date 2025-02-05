import { MikroORM } from '@mikro-orm/core';
import { MsSqlDriver } from '@mikro-orm/mssql';
import { Membership } from '../../user/membership.entity.js';
import { Payment } from '../../user/payment.entity.js';
import { User } from '../../user/user.entity.js';
import { MembershipType } from '../../user/membershipType.entity.js';
import { Sport } from '../../user/sport.entity.js';
import { Province } from '../../user/province.entity.js';
import { Locality } from '../../user/locality.entity.js';
import { sqlConfig, connectToDatabase } from './Connection.js';
import dotenv from 'dotenv';
dotenv.config();
connectToDatabase();
console.log('Connecting to database with:', process.env.DB_SERVER);
console.log('Before MikroORM.init:', {
    dbName: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});
export const orm = await MikroORM.init({
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_SERVER,
    driver: MsSqlDriver,
    driverOptions: {
        ...sqlConfig,
        encrypt: true,
        trustServerCertificate: true,
    },
    entities: [Membership, Payment, User, MembershipType, Sport, Province, Locality],
});
console.log('ORM Inicializado');
export const syncSchema = async () => {
    const generator = orm.getSchemaGenerator();
    await generator.updateSchema();
};
//# sourceMappingURL=orm.js.map