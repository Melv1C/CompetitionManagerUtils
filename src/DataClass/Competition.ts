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

    async load(mysql: MySQL, id: number, loadEvents: boolean = true): Promise<any> {
        const json = await mysql.select('competitions', id);
        this.fromJSON(json);

        if (loadEvents) {
            await this.loadEvents(mysql);
        }
    }

    async loadEvents(mysql: MySQL): Promise<any> {
        const SQL =     `SELECT * FROM events e
                        LEFT JOIN competition_events ce ON e.id = ce.event_id
                        WHERE ce.competition_id = ${this.id}`;
        const results = await mysql.query(SQL);
        this.events = results.map((result: any) => {
            const competition_event = new Competition_Event();
            competition_event.fromJSON(result);
            return competition_event;
        });
    }

    async save(mysql: MySQL): Promise<any> {
        const result = await super.save(mysql);
        if (this.events.length > 0) {
            await this.saveEvents(mysql);
        }
        return result;
    }

    async saveEvents(mysql: MySQL): Promise<any> {
        const query = ` INSERT INTO competition_events (competition_id, event_id, category_id, parentEvent_id)
                        VALUES ${this.events.map((event: Competition_Event) => `(${this.id}, ${event.event_id}, ${event.category_id}, ${event.parentEvent_id})`).join(',')}`;
        return mysql.query(query);
    }
}

export default Competition;