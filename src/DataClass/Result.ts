import BaseData from "./BaseData";
import Athlete from "./Athlete";

class Result extends BaseData {
    competition_id: string = '';
    event_name: string = '';
    athlete_ref: string = '';
    bib: number = 0;
    club: string = '';
    ref_status: string = '';
    seqnum: number = 0;
    result: number = 0;
    best: boolean = false;
    wind: string = '';
    heat: number = 0;
    points: number = 0;

    athlete: Athlete | undefined = undefined;

    constructor(competition_id?: string, event_name?: string) {
        super();
        this.table = 'temp_results';
        this.competition_id = competition_id || '';
        this.event_name = event_name || '';
    }

    setAthlete(athlete_ref: string) {
        this.athlete_ref = athlete_ref;
        this.athlete = new Athlete();
        this.athlete.loadBy('licence', athlete_ref);
        this.bib = this.athlete.bib;
        this.club = this.athlete.club;
    }
}

export default Result;