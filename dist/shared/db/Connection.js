import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config();
export const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        trustServerCertificate: true,
        encrypt: false,
    },
};
export async function connectToDatabase() {
    try {
        const pool = await sql.connect(sqlConfig);
        console.log('Conexión exitosa');
        return pool;
    }
    catch (err) {
        console.error('Error de conexión:', err);
    }
}
//# sourceMappingURL=Connection.js.map