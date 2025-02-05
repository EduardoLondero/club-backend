import { MikroORM } from '@mikro-orm/core';
import { MsSqlDriver } from '@mikro-orm/mssql';
export declare const orm: MikroORM<MsSqlDriver, import("@mikro-orm/mssql").EntityManager<MsSqlDriver> & import("@mikro-orm/core").EntityManager<import("@mikro-orm/core").IDatabaseDriver<import("@mikro-orm/core").Connection>>>;
export declare const syncSchema: () => Promise<void>;
