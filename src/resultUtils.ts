import { Result } from './';

export function formatResult(result: number, resultType: string): string {
    if (result === 0) {
        return '/';
    }

    switch (resultType) {
        case 'Time':
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
        case 'Height' || 'Distance':
            return `${result} m`;
        case 'Points':
            return `${result} pts`;
        default:
            return result.toString();
    }
}

export function compareResult(resultType: string, a: number, b: number): number {
    if (resultType === 'Time') {
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