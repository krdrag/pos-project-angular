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

