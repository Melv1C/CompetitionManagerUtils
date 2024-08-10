import BaseData from "./BaseData";
import Competition_Event from "./Competition_Event";
import MySQL from "../mysql";


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
    
    constructor(name?: string) {
        super();
        this.table = 'competitions';
        this.name = name || '';
    }

    async load(id: number, loadEvents: boolean = true): Promise<any> {
        await super.load(id);
        if (loadEvents) {
            await this.loadEvents();
        }
    }

    async loadEvents(): Promise<any> {
        const SQL =     `SELECT * FROM events e
                        LEFT JOIN competition_events ce ON e.id = ce.event_id
                        WHERE ce.competition_id = ${this.id}`;
        const results = await MySQL.query(SQL);
        this.events = results.map((result: any) => {
            const competition_event = new Competition_Event();
            competition_event.fromJSON(result);
            return competition_event;
        });
    }

    async save(): Promise<any> {
        const result = await super.save();
        if (this.events.length > 0) {
            await this.saveEvents();
        }
        return result;
    }

    async saveEvents(): Promise<any> {
        for (const event of this.events) {
            event.competition_id = this.id;
            await event.save();
        }
    }
}

export default Competition;