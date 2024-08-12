import { BaseData } from '..';

class Param extends BaseData {

    _table: string = 'params';  
    static TABLE: string = 'params';
    
    name: string = '';
    description: string = '';
    value: string = '';
    type: string = '';

    constructor() {
        super();
    }

    getValue(): any {
        if (this.type === 'integer') {
            return parseInt(this.value);
        } else if (this.type === 'float') {
            return parseFloat(this.value);
        } else if (this.type === 'boolean') {
            return this.value === 'true';
        } else {
            return this.value;
        }
    }
}

export default Param;