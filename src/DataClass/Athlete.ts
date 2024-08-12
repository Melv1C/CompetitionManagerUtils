import { BaseData } from "./BaseData";

class Athlete extends BaseData {
    
    _table: string = 'athletes';
    static TABLE: string = 'athletes';

    licence: string = '';
    firstName: string = '';
    lastName: string = '';
    bib: number = 0;
    gender: string = '';
    birthDate: Date = new Date();
    club: string = '';

    constructor() {
        super();
    }
}

export default Athlete;