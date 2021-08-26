import { User } from "./../../models/user.model";

export class Login {
    static readonly type = '[USER] LOGIN'

    constructor(public payload: User) {}
}

export class Logout {
    static readonly type = '[USER] LOGOUT'

    constructor() {}
}