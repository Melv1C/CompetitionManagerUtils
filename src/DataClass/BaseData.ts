import MySQL from "../mysql";

abstract class Serializable {

    constructor() {
        //
    }

    // Method to convert the object to a JSON string
    toJSON(): { [key: string]: any } {
        return JSON.parse(JSON.stringify(this));
    }
  
    // Method to convert a JSON string to an object
    fromJSON(json: { [key: string]: any }): void {
        Object.assign(this, json);
    }
  }

class BaseData extends Serializable {
    table: string = '';

    id: number = 0;
    create_by: string = '';
    create_at: number = 0;
    update_by: string = '';
    update_at: number = 0;

    async save(): Promise<any> {
        if (this.id && this.id > 0) {
            return MySQL.update(this.table, this.toJSON());
        } else {
            this.id = await MySQL.insert(this.table, this.toJSON());
            return this.id;
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