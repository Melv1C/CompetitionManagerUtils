import { BaseData } from './BaseData';

class Competition_Event extends BaseData {

    _table: string = 'competition_events';
    static TABLE: string = 'competition_events';

    competition_id:         number = 0;
    event_id:               number = 0;
    parentEvent_id:         number|null = null;

    name:                   string = '';
    time:                   string = '';
    maxAthletes:            number = 0;
    price:                  number = 0;
    categories:             string[] = [];
    
    constructor() {
        super();
    }
}

export default Competition_Event;