import MySQL from "../mysql";

class BaseData {
    table: string = '';

    id: number = 0;
    create_by: string = '';
    create_at: number = 0;
    static update_by: string = '';
    static update_at: number = 0;

    [key: string]: any; // Add index signature

    constructor() {

    }

    fromJSON(json: any): void {
        for (const key in json) {
            if (this.hasOwnProperty(key)) {
                this[key] = json[key];
            }
        }
    }

    toJSON(): any {
        const json: any = {};
        for (const key in this) {
            if (this.hasOwnProperty(key) && typeof this[key] !== 'function') {
                json[key] = this[key];
            }
        }
        return json;
    }

    async save(mysql: MySQL): Promise<any> {
        if (this.id && this.id > 0) {
            return mysql.update(this.table, this.toJSON());
        } else {
            return mysql.insert(this.table, this.toJSON());
        }
    }

    async load(mysql: MySQL, id: number): Promise<any> {
        const json = await mysql.select(this.table, id);
        this.fromJSON(json);
    }

    async loadBy(mysql: MySQL, field: string, value: any): Promise<any> {
        const json = await mysql.selectBy(this.table, field, value);
        this.fromJSON(json);
    }

    async delete(mysql: MySQL): Promise<any> {
        return mysql.delete(this.table, this.id);
    }
}


export default BaseData;