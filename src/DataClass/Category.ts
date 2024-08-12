import { BaseData } from './BaseData';

abstract class Category extends BaseData {

    _table: string = 'categories';
    static TABLE: string = 'categories';

    name: string = '';
    gender: string = '';

    constructor() {
        super();
    }
}

export default Category;