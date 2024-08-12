import { BaseData } from './BaseData';
import Competition_Event from "./Competition_Event";



class Competition extends BaseData {
    name: string = '';
    admin_id: string = '';
    competitionDate: Date = new Date();
    inscriptionEnd: Date = new Date();
    location: string = '';
    club: string = '';
    freeForOrgClub: boolean = false;
    linkSchedule: string = '';
    contactEmail: string = '';
    description: string = '';
    open: boolean = false;
    oneDayAthlete: boolean = false;
    foreignAthlete: boolean = true;
    events: Competition_Event[] = [];

    table: string = 'competitions';
    
    constructor(name?: string) {
        super();
        this.name = name || '';
    }
}

export default Competition;