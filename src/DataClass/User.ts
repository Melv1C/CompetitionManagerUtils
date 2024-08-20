import { BaseData } from "./BaseData";

class User extends BaseData {
        
    _table: string = 'users';
    static TABLE: string = 'users';

    username: string = '';
    password: string = '';
    role: 'user' | 'admin' | 'superadmin' = 'user';
    email: string = '';

    constructor() {
        super();
    }
}

export default User;