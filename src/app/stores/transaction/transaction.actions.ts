import { TaObject } from "src/app/models/taObject.model";
import { Transaction } from "src/app/models/transaction.model";

export class StartTransaction {
    static readonly type = '[TRANSACTION] START TRANSACTION'

    constructor(public payload: Transaction) {}
}

export class AddTaObj {
    static readonly type = '[TRANSACTION] ADD TAOBJ'

    constructor(public payload: TaObject) {}
}

export class RemoveTotal{
    static readonly type = '[TRANSACTION] REMOVE TOTAL'

    constructor() {}
}

export class AddTotal{
    static readonly type = '[TRANSACTION] ADD TOTAL'

    constructor() {}
}

export class CloseTransaction{
    static readonly type = '[TRANSACTION] CLOSE TRANSACTION'

    constructor() {}
}