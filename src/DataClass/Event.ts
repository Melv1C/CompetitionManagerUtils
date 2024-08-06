import MySQL from "../mysql";
import BaseData from "./BaseData";
import Category from "./Category";

class Event extends BaseData {
    eve_name: string = '';
    eve_abbr: string = '';
    eve_grouping: string = '';
    eve_type: string = '';

    eve_categories: Category[] = [];

    constructor() {
        super();
        this.table = 'events';
    }

    async load(mysql: MySQL, id: number, loadCategories: boolean = false): Promise<any> {
        const json = await mysql.select('events', id);
        this.fromJSON(json);

        if (loadCategories) {
            await this.loadCategories(mysql);
        }
    }

    async loadCategories(mysql: MySQL): Promise<any> {
        const SQL =     `SELECT * FROM categories c
                        LEFT JOIN event_categories ec ON c.id = eve_cat_ref_category
                        WHERE eve_cat_ref_event = ?`;
        const results = await mysql.query(SQL, [this.id]);
        this.eve_categories = results.map((result: any) => {
            const category = new Category();
            category.fromJSON(result);
            return category;
        });
    }

    async save(mysql: MySQL): Promise<any> {
        const result = await super.save(mysql);
        if (this.eve_categories.length > 0) {
            await this.saveCategories(mysql);
        }
        return result;
    }

    async saveCategories(mysql: MySQL): Promise<any> {
        const SQL = 'INSERT INTO event_categories (eve_cat_ref_event, eve_cat_ref_category) VALUES (?, ?)';
        for (const category of this.eve_categories) {
            await mysql.query(SQL, [this.id, category.id]);
        }
        return true;
    }
}

export default Event;