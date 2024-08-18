import { BaseData, Event } from '..';

class Competition_Event extends BaseData {

    _table: string = 'competition_events';
    static TABLE: string = 'competition_events';

    competition_id:         number = 0;
    event_id:               number = 0;
    event_name:             string = '';
    event_abbr:             string = '';
    event_resultType:       string = '';
    parentEvent_id:         number|null = null;

    name:                   string = '';
    time:                   string = '';
    maxAthletes:            number = 0;
    price:                  number = 0;
    categories:             string[] = [];

    setEvent(event: Event): void {
        this.event_id = event.id;
        this.event_name = event.name;
        this.event_abbr = event.abbr;
        this.event_resultType = event.resultType;
    }
    
    constructor() {
        super();
    }
}

export default Competition_Event;