import BaseData from "./BaseData";
import MySQL from "../mysql";

class Param extends BaseData {
    name: string = '';
    description: string = '';
    value: string = '';
    type: string = '';
    

    constructor() {
        super();
        this.table = 'params';
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

function getParam(mysql: MySQL, name: string): Param {
    const param = new Param();
    param.loadBy(mysql, 'name', name);
    return param;
}

export { getParam };