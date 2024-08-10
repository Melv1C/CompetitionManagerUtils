import { MySQL, BaseData, Athlete, compareResult } from '../'

class Result extends BaseData {
    competition_id: number = 0;
    competitionEvent_id: number = 0;
    resultType: string = '';

    inscription_id: number = 0;

    athlete_ref: string = '';
    bib: number = 0;
    club: string = '';
    status_ref: number = 0;
    value: number = 0;
    result: string = '';
    wind: string = '';
    heat: number = 0;
    points: number = 0;
    details: ResultDetail[] = [];

    athlete: Athlete | null = null;

    constructor(competition_id: number, competitionEvent_id: number, resultType: string) {
        super();
        this.table = 'results';
        this.competition_id = competition_id;
        this.competitionEvent_id = competitionEvent_id;
        this.resultType = resultType;
    }

    async load(id: number): Promise<any> {
        await super.load(id);
        this.athlete = new Athlete();
        await this.athlete.loadBy('license', this.athlete_ref);
        await this.loadDetails();
    }

    async loadDetails(): Promise<any> {
        const SQL = `SELECT * FROM results_details WHERE result_id = ${this.id}`;
        const results = await MySQL.query(SQL);
        this.details = results.map((result: any) => {
            const detail = new ResultDetail();
            detail.fromJSON(result);
            return detail;
        });
    }

    async save(): Promise<any> {
        const result = await super.save();
        if (this.details.length > 0) {
            await this.saveDetails();
        }
        return result;
    }

    async saveDetails(): Promise<any> {
        for (const detail of this.details) {
            detail.result_id = this.id;
            await detail.save();
        }
    }

    linkToInscription(inscription_id: number): void {
        this.inscription_id = inscription_id;
    }

    setAthlete(athlete: Athlete): void {
        this.athlete = athlete;
        this.athlete_ref = athlete.ref;
        this.bib = athlete.bib;
        this.club = athlete.club;
    }

    setAthleteRef(athlete_ref: string): void {
        this.athlete_ref = athlete_ref;
        this.athlete = new Athlete();
        this.athlete.loadBy('license', athlete_ref);
        this.bib = this.athlete.bib;
        this.club = this.athlete.club;
    }

    addDetail(): void {
        const detail = new ResultDetail(this.id);
        detail.seqnum = this.details.length + 1;
        this.details.push(detail);
    }

    calculatePoints(): void {
        // Todo: Implement this
    }

    computeResult(eventType: string): void {
        this.details.sort((a, b) => compareResult(eventType, a.value, b.value));
        this.details[0].best = true;
        this.result = this.details[0].result;
        this.points = this.details[0].points;
        this.wind = this.details[0].wind;
        this.heat = this.details[0].heat;

        this.details.sort((a, b) => a.seqnum - b.seqnum);
    }


}

class ResultDetail extends BaseData {
    result_id: number = 0;
    seqnum: number = 0;
    value: number = 0;
    result: string = '';
    best: boolean = false;
    wind: string = '';
    heat: number = 0;
    points: number = 0;

    constructor(result_id: number = 0) {
        super();
        this.table = 'results_details';
        this.result_id = result_id;
    }
}

export { Result, ResultDetail };

export async function getResults(competition_id: number, competitionEvent_id: number): Promise<Result[]> {
    const SQL = `SELECT * FROM results WHERE competition_id = ${competition_id} AND competitionEvent_id = ${competitionEvent_id}`;
    const results = await MySQL.query(SQL);
    return results.map((result: any) => {
        const r = new Result(competition_id, competitionEvent_id, result.resultType);
        r.fromJSON(result);
        return r;
    });
}