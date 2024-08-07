import MySQL from "../mysql";

export async function getAll(mysql: MySQL, table: string, classType: any): Promise<any[]> {
    const results = await mysql.selectAll(table);
    return results.map((result: any) => {
        const instance = new classType();
        instance.fromJSON(result);
        return instance;
    });
}

export async function searchAll(mysql: MySQL, table: string, fields: string[], keyword: string, classType: any): Promise<any[]> {
    const results = await mysql.search(table, fields, keyword);
    return results.map((result: any) => {
        const instance = new classType();
        instance.fromJSON(result);
        return instance;
    });
}




