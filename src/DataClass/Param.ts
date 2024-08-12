import { MySQL, BaseData } from '..';

class Param extends BaseData {
    name: string = '';
    description: string = '';
    value: string = '';
    type: string = '';

    table: string = 'params';    

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

async function getParam(name: string): Promise<Param> {
    return MySQL.loadBy<Param>("params", "name", name);
}

export { getParam };