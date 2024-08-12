import { BaseData } from "./BaseData";

class Athlete extends BaseData {
    licence: string = '';
    firstName: string = '';
    lastName: string = '';
    bib: number = 0;
    gender: string = '';
    birthDate: Date = new Date();
    club: string = '';

    table: string = 'athletes';

    constructor() {
        super();
    }
}

export default Athlete;