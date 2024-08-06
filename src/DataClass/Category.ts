import BaseData from './BaseData';

class Category extends BaseData {
    abbr: string = '';
    gender: string = '';

    constructor() {
        super();
        this.table = 'categories';
    }
}

export default Category;