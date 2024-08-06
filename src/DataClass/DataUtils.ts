import MySQL from "../mysql";

export async function getAll(mysql: MySQL, table: string, classType: any): Promise<any[]> {
    const results = await mysql.selectAll(table);
    return results.map((result: any) => {
        const instance = new classType();
        instance.fromJSON(result);
        return instance;
    });
}




