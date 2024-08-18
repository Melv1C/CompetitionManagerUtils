import { BaseData, Athlete, compareResult, formatResult, Competition_Event } from '../'

class Result extends BaseData {
    _table: string = 'results';
    static TABLE: string = 'results';

    competition_id:             number = 0;

    competitionEvent_id:        number = 0;
    event_name:                 string = ''; // Competition_Event.name
    event_resultType:           string = ''; // Competition_Event.event_resultType

    athlete_ref:                string = '';
    bib:                        number = 0;
    club:                       string = '';

    heat:                       number = 0;
    initialOrder:               number = 0;
    tempOrder:                  number = 0;
    finalOrder:                 number = 0;

    value:                      number = 0;
    result:                     string = '';
    wind:                       string = '';

    points:                     number = 0;

    details:                    ResultDetail[] = [];

    athlete:                    Athlete | null = null;

    constructor() {
        super();
    }

    setEvent(event: Competition_Event): void {
        this.competitionEvent_id = event.id;
        this.event_name = event.name;
        this.event_resultType = event.event_resultType;
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
        const detail = new ResultDetail(this.id);
        this.details.push(detail);
        return detail;
    }

    getDetail(trynum: number): ResultDetail | undefined {
        return this.details.find((detail) => detail.trynum === trynum);
    }

    getBest(): void {
        this.details.sort((a, b) => compareResult(this.event_resultType, a.value, b.value));

        this.details[0].best = true;
        this.value = this.details[0].value;
        this.result = formatResult(this.value, this.event_resultType);
        this.wind = this.details[0].wind;

        this.computePoints();

        this.orderDetails();
    }

    orderDetails(): void {
        this.details.sort((a, b) => {
            if (a.trynum == b.trynum) {
                return compareResult(this.event_resultType, b.value, a.value);
            } else {
                return a.trynum - b.trynum;
            }
        });
    }

    computePoints(): void {
        this.points = 0;
    }

}

class ResultDetail extends BaseData {
    
    _table: string = 'results_details';
    static TABLE: string = 'results_details';

    result_id:              number = 0;

    trynum:                 number = 0;

    best:                   boolean = false;

    value:                  number = 0;
    result:                 string = '';
    wind:                   string = '';

    constructor(result_id?: number) {
        super();
        this.result_id = result_id || 0;
    }
    
    setResult_id(result_id: number): void {
        this.result_id = result_id;
    }

    setPerformance(trynum: number, value: number, result: string, wind: string): void {
        this.trynum = trynum;
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
