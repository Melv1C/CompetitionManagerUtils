import { BaseData } from './BaseData';

class Competition_Event extends BaseData {

    _table: string = 'competition_events';
    static TABLE: string = 'competition_events';

    competition_id: number = 0;
    event_id: number = 0;
    category: string = '';
    parentEvent_id: number = 0;
    
    constructor() {
        super();
    }
}

export default Competition_Event;