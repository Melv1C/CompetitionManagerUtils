import { Result } from './';

function GetCode(result: number, resultType: string): string {
    switch (resultType) {
        case 'Time':
            switch (result) {
                case -1: // ??
                    return 'DNF';
                case -2:
                    return 'DQ';
                case -3: // ??
                case -9:
                    return 'DNS';
                default:
                    return result.toString();
            }
        case 'Height':
            switch (result) {
                case -1:
                    return 'X';
                case -2:
                    return '-';
                case -3:
                    return 'DNS';
                case -7:
                    return 'NM';
                case -8:
                    return 'r';
                default:
                    return result.toString();
            }
        case 'Distance':
            switch (result) {
                case -1:
                    return 'X';
                case -2:
                    return '-';
                case -3:
                    return 'DNS';
                case -7:
                    return 'NM';
                case -8:
                    return 'r';
                default:
                    return result.toString();
            }
        case 'Points':
            return result.toString();
        default:
            return result.toString();
    }
}

export function formatResult(result: number, resultType: string): string {
    if (result <= 0) {
        return GetCode(result, resultType);
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
        case 'Height':
        case 'Distance':
            // always 2 decimals
            return `${result.toFixed(2)} m`;
        case 'Points':
            return `${result} pts`;
        default:
            return result.toString();
    }
}

export function compareResult(resultType: string, a: number, b: number): number {
    if (resultType === 'Time') {
        // si les 2 sont négatifs (DNF, DNS, DQ, etc)
        if (a <= 0 && b <= 0) {
            return 0;
        } else if (a <= 0) {
            return 1;
        } else if (b <= 0) {
            return -1;
        } else {
            return a - b;
        }
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

