import { Result } from './';

const TIME          = 1;  
const DISTANCE      = 2;
const POINTS        = 3;

const RESULT_TYPE: { [key: string]: number } = {
    "Sprint": TIME,
    "Demi-fond": TIME,
    "Fond": TIME,
    "Saut": DISTANCE,
    "Lancer": DISTANCE,
    "Epreuves multiples": POINTS
};


export function formatResult(result: number, eventType: string): string {
    if (result === 0) {
        return '/';
    }
    if (RESULT_TYPE[eventType] === TIME) { // value is milliseconds
        let time = new Date(result);
        let minutes = time.getUTCMinutes();
        let seconds = time.getUTCSeconds();
        let milliseconds = time.getUTCMilliseconds();

        let centiseconds = Math.floor(milliseconds / 10);

        if (minutes > 0) {
            return `${minutes}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
        } else {
            return `${seconds}.${centiseconds.toString().padStart(2, '0')}`;
        }

    } else if (RESULT_TYPE[eventType] === DISTANCE) { //1.80 => 1.80m
        return `${result} m`;
    } else if (RESULT_TYPE[eventType] === POINTS) {
        return `${result} pts`;
    } else {
        return `${result}`;
    }
        
        
}

export function compareResult(eventType: string, a: number, b: number): number {
    if (RESULT_TYPE[eventType] === TIME) {
        return a - b;
    } else {
        return b - a;
    }
}

export function isResultValid(result: Result): boolean {
    // Valid if wind less than +2.0
    if (result.wind.charAt(0) === '+') {
        return parseFloat(result.wind) <= 2.0;
    } else {
        return true;
    }
}