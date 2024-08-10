import MySQL from "../mysql";

export async function getAll(table: string, classType: any): Promise<any[]> {
    const results: { [key: string]: any }[] = await MySQL.selectAll(table);
    return results.map((result: any) => {
        const instance = new classType();
        instance.fromJSON(result);
        return instance;
    });
}

export async function searchAll(table: string, fields: string[], keyword: string, classType: any): Promise<any[]> {
    const results: { [key: string]: any }[] = await MySQL.searchAll(table, fields, keyword);
    return results.map((result: any) => {
        const instance = new classType();
        instance.fromJSON(result);
        return instance;
    });
}




