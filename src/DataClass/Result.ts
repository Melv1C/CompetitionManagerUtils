import { MySQL, BaseData, Athlete, compareResult } from '../'

class Result extends BaseData {

    _table: string = 'results';
    static TABLE: string = 'results';

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

    constructor(competition_id?: number, competitionEvent_id?: number, resultType?: string) {
        super();
        this.competition_id = competition_id || 0;
        this.competitionEvent_id = competitionEvent_id || 0;
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

    addDetail(): ResultDetail {
        const detail = new ResultDetail();
        detail.seqnum = this.details.length + 1;
        this.details.push(detail);
        return detail;
    }

    calculatePoints(): void {
        // Todo: Implement this
    }

    computeResult(eventType: string): void {
        this.details.sort((a, b) => compareResult(eventType, a.value, b.value));
        this.details[0].best = true;
        this.value = this.details[0].value;
        this.result = this.details[0].result;
        this.points = this.details[0].points;
        this.wind = this.details[0].wind;
        this.heat = this.details[0].heat;

        this.details.sort((a, b) => a.seqnum - b.seqnum);
    }

}

class ResultDetail extends BaseData {
    
    _table: string = 'results_details';
    static TABLE: string = 'results_details';

    result_id: number = 0;
    seqnum: number = 0;
    value: number = 0;
    result: string = '';
    best: boolean = false;
    wind: string = '';
    heat: number = 0;
    points: number = 0;

    constructor() {
        super();
    }

    setResult_id(result_id: number): void {
        this.result_id = result_id;
    }
}

export { Result, ResultDetail };
