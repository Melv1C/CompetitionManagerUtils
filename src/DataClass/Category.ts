import BaseData from './BaseData';

class Category extends BaseData {
    cat_name: string = '';
    cat_abbr: string = '';
    cat_gender: string = '';

    constructor() {
        super();
        this.table = 'categories';
    }
}

export default Category;