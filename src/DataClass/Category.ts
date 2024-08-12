import { BaseData } from './BaseData';

class Category extends BaseData {

    _table: string = 'categories';
    static TABLE: string = 'categories';

    name: string = '';
    gender: string = '';

    constructor() {
        super();
    }
}

export default Category;