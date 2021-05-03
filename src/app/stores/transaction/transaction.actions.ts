import { TaObject } from "src/app/models/taObject.model";
import { Transaction } from "src/app/models/transaction.model";

export class UpdateTransaction {
    static readonly type = '[TRANSACTION] Update TRANSACTION'

    constructor(public payload: Transaction) {}
}
