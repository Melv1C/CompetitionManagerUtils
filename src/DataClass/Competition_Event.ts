import BaseData from './BaseData';


class Competition_Event extends BaseData {
    competition_id: number = 0;
    event_id: number = 0;
    category_id: number = 0;
    parentEvent_id: number = 0;
    constructor() {
        super();
        this.table = 'competition_events';
    }
}

export default Competition_Event;