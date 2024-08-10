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

    async save(): Promise<any> {
        if (this.id && this.id > 0) {
            return MySQL.update(this.table, this.toJSON());
        } else {
            return MySQL.insert(this.table, this.toJSON());
        }
    }

    async load(id: number): Promise<any> {
        const json = await MySQL.select(this.table, id);
        this.fromJSON(json);
    }

    async loadBy(field: string, value: any): Promise<any> {
        const json = await MySQL.selectBy(this.table, field, value);
        this.fromJSON(json);
    }

    async delete(): Promise<any> {
        return MySQL.delete(this.table, this.id);
    }
}


export default BaseData;