import { BaseData, Athlete, compareResult, formatResult } from '../'

/*
CREATE TABLE IF NOT EXISTS results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    competition_id INT,
    competitionEvent_id INT,
    athlete_ref VARCHAR(25),
    bib INT,
    club VARCHAR(25),
    heat INT,
    initialOrder INT,
    value double,
    result varchar(10),
    wind varchar(10),
    points INT,
    create_by VARCHAR(50),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    update_by VARCHAR(50),
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (competition_id) REFERENCES competitions(id),
    FOREIGN KEY (competitionEvent_id) REFERENCES competition_events(id),
    FOREIGN KEY (athlete_ref) REFERENCES athletes(licence)
);
*/

class Result extends BaseData {
    _table: string = 'results';
    static TABLE: string = 'results';

    competition_id:             number = 0;
    competitionEvent_id:        number = 0;

    athlete_ref:                string = '';
    bib:                        number = 0;
    club:                       string = '';

    heat:                       number = 0;
    initialOrder:               number = 0;
    tempOrder:                  number = 0;
    finalOrder:                 number = 0;

    value:                      number = 0;
    result:                     string = '';
    wind:                        string = '';

    points:                     number = 0;

    details:                    ResultDetail[] = [];

    athlete:                    Athlete | null = null;

    constructor() {
        super();
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
        const detail = new ResultDetail(this.id);
        this.details.push(detail);
        return detail;
    }

    getDetail(trynum: number): ResultDetail | undefined {
        return this.details.find((detail) => detail.trynum === trynum);
    }

    getBest(): void {
        this.details.sort((a, b) => compareResult(this.resultType, a.value, b.value));

        this.details[0].best = true;
        this.value = this.details[0].value;
        this.result = formatResult(this.value, this.resultType);
        this.wind = this.details[0].wind;

        this.computePoints();

        this.orderDetails();
    }

    orderDetails(): void {
        this.details.sort((a, b) => {
            if (a.trynum == b.trynum) {
                return compareResult(this.resultType, b.value, a.value);
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
