
import { BaseData } from './BaseData';

class Event extends BaseData {

    _table: string = 'events';
    static TABLE: string = 'events';

    name: string = '';
    abbr: string = '';
    eventType: string = '';
    resultType: string = '';

    constructor() {
        super();
    }
}

export default Event;