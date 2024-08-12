
import { BaseData } from './BaseData';

class Event extends BaseData {
    name: string = '';
    abbr: string = '';
    eventGrouping: string = '';
    eventType: string = '';

    table: string = 'events';

    constructor() {
        super();
    }
}

export default Event;