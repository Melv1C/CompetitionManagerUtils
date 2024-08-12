
export class BaseData {
    _table: string = '';
    static TABLE: string = '';

    id: number = 0;
    create_by: string = '';
    create_at: number = 0;
    update_by: string = '';
    update_at: number = 0;

    [key: string]: any;

    constructor() {
    }

    public getTableName(): string {
        return this._table;
    }

    public getID(): number {
        return this.id;
    }

    public toJson(): Record<string, any> {
        return { ...this };
    }

    static fromJson<T extends BaseData>(this: new () => T, json: Record<string, any>): T {
        const obj = new this();
        Object.assign(obj, json);
        return obj;
    }
}