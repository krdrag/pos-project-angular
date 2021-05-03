import { TaObject } from "src/app/models/taObject.model";
import { Transaction } from "src/app/models/transaction.model";

export class StartTransaction {
    static readonly type = '[TRANSACTION] Start TRANSACTION'

    constructor(public payload: Transaction) {}
}

export class AddTaObj {
    static readonly type = '[TRANSACTION] Add TaObj'

    constructor(public payload: TaObject) {}
}

export class RemoveTotal{
    static readonly type = '[TRANSACTION] Remove Total'

    constructor() {}
}

export class AddTotal{
    static readonly type = '[TRANSACTION] Add Total'

    constructor() {}
}