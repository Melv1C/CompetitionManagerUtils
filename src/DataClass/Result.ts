import { BaseData, Athlete, compareResult } from '../'

class Result extends BaseData {
    _table: string = 'results';
    static TABLE: string = 'results';

    // competition_id: number = 0;
    // competitionEvent_id: number = 0;

    competition_id: string = '';
    competitionEvent_id: string = '';
    resultType: string = '';

    inscription_id: number = 0;

    athlete_ref: string = '';
    bib: number = 0;
    club: string = '';
    status_ref: number = 0;
    heat: number = 0;

    value: number = 0;
    result: string = '';
    wind: string = '';

    points: number = 0;

    details: ResultDetail[] = [];

    athlete: Athlete | null = null;

    constructor(competition_id?: string, competitionEvent_id?: string, resultType?: string) {
        super();
        this.competition_id = competition_id || '';
        this.competitionEvent_id = competitionEvent_id || '';
        this.resultType = resultType || '';
    }

    linkToInscription(inscription_id: number): void {
        this.inscription_id = inscription_id;
    }

    setAthlete(athlete: Athlete): void {
        this.athlete = athlete;
        this.athlete_ref = athlete.licence;
        this.bib = athlete.bib;
        this.club = athlete.club;
    }

    getDetails(): ResultDetail[] {
        return this.details;
    }

    newDetail(): ResultDetail {
        const detail = new ResultDetail(this.id, this.details.length + 1);
        this.details.push(detail);
        return detail;
    }

    getDetail(seqnum: number): ResultDetail | undefined {
        return this.details.find((detail) => detail.seqnum === seqnum);
    }

    getBest(): void {
        this.details.sort((a, b) => compareResult(this.resultType, a.value, b.value));

        this.details[0].best = true;
        this.value = this.details[0].value;
        this.result = this.details[0].result;
        this.wind = this.details[0].wind;

        this.details.sort((a, b) => a.seqnum - b.seqnum);
    }

}

class ResultDetail extends BaseData {
    
    _table: string = 'results_details';
    static TABLE: string = 'results_details';

    result_id: number = 0;
    seqnum: number = 0;

    best: boolean = false;

    value: number = 0;
    result: string = '';
    wind: string = '';

    constructor(result_id: number, seqnum: number) {
        super();
        this.result_id = result_id;
        this.seqnum = seqnum;
    }
    
    setResult_id(result_id: number): void {
        this.result_id = result_id;
    }

    setPerformance(value: number, result: string, wind: string): void {
        this.value = value;
        this.result = result;
        this.wind = wind;
    }

    setBest(): void {
        this.best = true;
    }

    isBest(): boolean {
        return this.best;
    }

}

export { Result, ResultDetail };
