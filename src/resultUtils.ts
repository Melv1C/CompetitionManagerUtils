import { Result } from './';


export function compareResult(eventType: string, a: number, b: number): number {
    if (eventType === 'time') {
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