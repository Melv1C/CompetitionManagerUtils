import BaseData from "./BaseData";
import Competition_Event from "./Competition_Event";
import MySQL from "../mysql";


class Competition extends BaseData {
    com_name: string = '';
    com_ref_admin: string = '';
    com_date: Date = new Date();
    com_inscriptionEnd: Date = new Date();
    com_location: string = '';
    com_club: string = '';
    com_freeForOrgClub: boolean = false;
    com_linkSchedule: string = '';
    com_contactEmail: string = '';
    com_description: string = '';
    com_open: boolean = false;
    com_oneDayAthlete: boolean = false;
    com_foreignAthlete: boolean = true;

    com_events: Competition_Event[] = [];
    
    constructor(name?: string) {
        super();
        this.table = 'competitions';
        this.com_name = name || '';
    }

    async load(mysql: MySQL, id: number, loadEvents: boolean = false): Promise<any> {
        const json = await mysql.select('competitions', id);
        this.fromJSON(json);

        if (loadEvents) {
            await this.loadEvents(mysql);
        }
    }

    async loadEvents(mysql: MySQL): Promise<any> {
        const SQL =     `SELECT * FROM events e
                        LEFT JOIN competition_events ce ON e.id = com_eve_ref_event
                        WHERE com_eve_ref_competition = ?`;
        const results = await mysql.query(SQL, [this.id]);
        this.com_events = results.map((result: any) => {
            const competition_event = new Competition_Event();
            competition_event.fromJSON(result);
            return competition_event;
        });
    }

    async save(mysql: MySQL): Promise<any> {
        const result = await super.save(mysql);
        if (this.com_events.length > 0) {
            await this.saveEvents(mysql);
        }
        return result;
    }

    async saveEvents(mysql: MySQL): Promise<any> {
        const SQL = 'INSERT INTO competition_events (com_eve_ref_competition, com_eve_ref_event, com_eve_ref_category, com_eve_ref_parent_event) VALUES (?, ?, ?, ?)';
        for (const competition_event of this.com_events) {
            await mysql.query(SQL, [this.id, competition_event.com_eve_ref_event, competition_event.com_eve_ref_category, competition_event.com_eve_ref_parent_event]);
        }
        return true;
    }
}

export default Competition;