import mysql from 'mysql2';
import dotenv from 'dotenv';

import { BaseData } from '.';

dotenv.config();

class MySQL {
    
    private static connection: mysql.Connection;

    static init() {
        this.connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT) : 3306,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            timezone: 'Z'
        });
    }

    static query(sql: string, values?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log('SQL:', sql);
            console.log('Values:', values);
            this.connection.query(sql, values, (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
            });
        });
    }

    static async getColumns(table: string): Promise<string[]> {
        const query = `SHOW COLUMNS FROM ${table}`;
        const results = await this.query(query);
        // omit the create_at and update_at columns
        return results.map((result: any) => result.Field).filter((column: string) => !['create_at', 'update_at'].includes(column));
    }

    static async insert(table: string, data: any): Promise<any> {
        const columns = await this.getColumns(table);
        const query = ` INSERT INTO ${table} (${columns.join(',')}) 
                        VALUES (${columns.map((column: string) => "?").join(',')})`;
        const values = columns.map((column: string) => data[column]);
        const results = await this.query(query, values);
        return results.insertId;
    }

    static async update(table: string, data: any): Promise<any> {
        const columns = await this.getColumns(table);
        const query = `UPDATE ${table} SET ${columns.map((column: string) => `${column} = ?`).join(',')} WHERE id = ?`;
        const values = columns.map((column: string) => data[column]);
        values.push(data.id);
        return this.query(query, values);
    }

    static async delete(table: string, id: number): Promise<any> {
        const query = `DELETE FROM ${table} WHERE id = ${id}`;
        return this.query(query);
    }

    static async select(table: string, id: number): Promise<{ [key: string]: any }> {
        const query = `SELECT * FROM ${table} WHERE id = ${id}`;
        const results = await this.query(query);
        return results.length > 0 ? results[0] : null;
    }

    static async selectBy(table: string, field: string, value: any): Promise<{ [key: string]: any }> {
        const query = `SELECT * FROM ${table} WHERE ${field} = ?`;
        const results = await this.query(query, [value]);
        return results.length > 0 ? results[0] : null;
    }

    static async selectAll(table: string): Promise<{ [key: string]: any }[]> {
        const query = `SELECT * FROM ${table}`;
        return this.query(query);
    }

    static async searchAll(table: string, fields: string[], keyword: string): Promise<{ [key: string]: any }[]> {
        const keys = keyword.split(' ').filter((key: string) => key.length > 0);
        const conditions = keys.map((key: string) => `(${fields.map((field: string) => `${field} LIKE ?`).join(' OR ')})`).join(' AND ');
        const values = keys.flatMap((key: string) => fields.map((field: string) => `%${key}%`));
        const query = `SELECT * FROM ${table} WHERE ${conditions}`;
        return this.query(query, values);
    }



    static async save<T extends BaseData>(data: T): Promise<number> {
        if (data.id === 0) {
            return this.insert(data.getTableName(), data.toJson());
        } else {
            return this.update(data.getTableName(), data.toJson());
        }
    }

    static async remove<T extends BaseData>(data: T): Promise<boolean> {
        if (data.id === 0) {
            return false;
        } else {
            await this.delete(data.getTableName(), data.id);
            return true;
        }
    }

    static async load<T extends BaseData>(table: string, id: number): Promise<T> {
        const result = await this.select(table, id);
        if (result) {
            return BaseData.fromJson(result) as T;
        } else {
            return new BaseData() as T;
        }
    }

    static async loadBy<T extends BaseData>(table: string, field: string, value: any): Promise<T> {
        const result = await this.selectBy(table, field, value);
        if (result) {
            return BaseData.fromJson(result) as T;
        } else {
            return new BaseData() as T;
        }
    }
}

export default MySQL;