import MySQL from "../mysql";
import BaseData from "./BaseData";
import Category from "./Category";

class Event extends BaseData {
    name: string = '';
    abbr: string = '';
    eventGrouping: string = '';
    eventType: string = '';

    constructor() {
        super();
        this.table = 'events';
    }
}

export default Event;