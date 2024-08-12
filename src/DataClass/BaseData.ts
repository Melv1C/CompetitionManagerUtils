
export class BaseData {
    id: number = 0;
    create_by: string = '';
    create_at: number = 0;
    update_by: string = '';
    update_at: number = 0;

    table: string = '';

    public getID(): number {
        return this.id;
    }

    getTableName(): string {
        return this.table;
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