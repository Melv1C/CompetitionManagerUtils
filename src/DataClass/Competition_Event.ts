import BaseData from './BaseData';


class Competition_Event extends BaseData {
    com_eve_ref_competition: number = 0;
    com_eve_ref_event: number = 0;
    com_eve_ref_category: number = 0;
    com_eve_ref_parent_event: number = 0;

    constructor() {
        super();
        this.table = 'competition_events';
    }
}

export default Competition_Event;