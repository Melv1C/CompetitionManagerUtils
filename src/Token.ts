
class Token {
    user: string = '';
    email: string = '';
    password: string = '';
    token: string = '';
    create_at: number = 0;
    expire_at: number = 0;
    active: boolean = false;
    type: string = '';
    id: number = 0;

    constructor() {
    }

    encode(): string {
        return Buffer.from(JSON.stringify(this)).toString('base64');
    }

    static decode(token: string): Token {
        return JSON.parse(Buffer.from(token, 'base64').toString());
    }

    isValid(): boolean {
        return this.active && this.expire_at > Date.now();
    }
}

export default Token;

export function generateToken(user: string, email: string, password: string, type: string, expire: number = 3600): Token {
    const token = new Token();
    token.user = user;
    token.email = email;
    token.password = password;
    token.type = type;
    token.create_at = Date.now();
    token.expire_at = token.create_at + expire * 1000;
    token.token = token.encode();
    return token;
}


