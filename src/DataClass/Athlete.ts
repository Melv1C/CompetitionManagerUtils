import BaseData from "./BaseData";

class Athlete extends BaseData {
    ath_firstName: string = '';
    ath_lastName: string = '';
    ath_bib: number = 0;
    ath_gender: string = '';
    ath_birthDate: Date = new Date();
    ath_club: string = '';

    constructor() {
        super();
        this.table = 'athletes';
    }
}

export default Athlete;