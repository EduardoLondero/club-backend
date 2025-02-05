import sql from 'mssql';
export declare const sqlConfig: {
    user: string;
    password: string;
    server: string;
    database: string;
    options: {
        trustServerCertificate: boolean;
        encrypt: boolean;
    };
};
export declare function connectToDatabase(): Promise<sql.ConnectionPool | undefined>;
