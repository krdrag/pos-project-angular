import { Transaction } from "src/app/models/transaction.model";

export class StartTransaction {
    static readonly type = '[TRANSACTION] START TRANSACTION'

    constructor(public payload: Transaction) {}
}