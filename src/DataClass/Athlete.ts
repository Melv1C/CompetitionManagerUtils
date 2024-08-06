import BaseData from "./BaseData";

class Athlete extends BaseData {
    license: string = '';
    firstName: string = '';
    lastName: string = '';
    bib: number = 0;
    gender: string = '';
    birthDate: Date = new Date();
    club: string = '';

    constructor() {
        super();
        this.table = 'athletes';
    }
}

export default Athlete;