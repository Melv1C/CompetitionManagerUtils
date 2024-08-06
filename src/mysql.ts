import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

class MySQL {
    private connection: mysql.Connection;

    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
        });
    }

    query(sql: string): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log('SQL:', sql);
            this.connection.query(sql, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    async getColumns(table: string): Promise<string[]> {
        const query = `SHOW COLUMNS FROM ${table}`;
        const results = await this.query(query);
        // omit the create_at and update_at columns
        return results.map((result: any) => result.Field).filter((column: string) => !['create_at', 'update_at'].includes(column));
    }

    async insert(table: string, data: any): Promise<any> {
        const columns = await this.getColumns(table);
        const query = ` INSERT INTO ${table} (${columns.join(',')}) 
                        VALUES (${columns.map((column: string) => formatValue(data[column])).join(',')})`;
        return this.query(query);
    }

    async update(table: string, data: any): Promise<any> {
        const columns = await this.getColumns(table);
        const query = ` UPDATE ${table} 
                        SET ${columns.map((column: string) => `${column} = ${formatValue(data[column])}`).join(',')}
                        WHERE id = ${data.id}`;
    }

    async delete(table: string, id: number): Promise<any> {
        const query = `DELETE FROM ${table} WHERE id = ${id}`;
        return this.query(query);
    }

    async select(table: string, id: number): Promise<any> {
        const query = `SELECT * FROM ${table} WHERE id = ${id}`;
        const results = await this.query(query);
    }

    async selectAll(table: string): Promise<any> {
        const query = `SELECT * FROM ${table}`;
        return this.query(query);
    }
}

function formatValue(value: any): string {
    if (typeof value === 'string') {
        return `'${value.replace(/'/g, "''")}'`;
    } else if (typeof value === 'number') {
        return value.toString();
    } else if (typeof value === 'boolean') {
        return value ? '1' : '0';
    } else if (value instanceof Date) {
        return value.toISOString();
    } else {
        return 'NULL';
    }
}

export default MySQL;