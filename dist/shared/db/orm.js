import { MikroORM } from '@mikro-orm/core';
import { MongoHighlighter } from '@mikro-orm/mongo-highlighter';
import { MongoDriver } from '@mikro-orm/mongodb';
export const orm = await MikroORM.init({
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: 'clubProgram',
    driver: MongoDriver,
    clientUrl: 'mongodb+srv://alejoojedaverbo:Bw9z66Jtfp7cAZRg@cluster0.jo8ph.mongodb.net/', // URL de conexión a Atlas',
    highlighter: new MongoHighlighter(),
    debug: true,
    schemaGenerator: {
        disableForeignKeys: true,
        createForeignKeyConstraints: true,
        ignoreSchema: [],
    },
});
export const syncSchema = async () => {
    const generator = orm.getSchemaGenerator();
    /*
    await generator.dropSchema()
    await generator.createSchema()
    */
    await generator.updateSchema();
};
//# sourceMappingURL=orm.js.map