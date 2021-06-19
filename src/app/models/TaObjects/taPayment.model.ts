import { TaObject } from "../taObject.model";

export class TaPayment implements TaObject {
    paid: number;

    public constructor(init?:Partial<TaPayment>) {
        Object.assign(this, init);
    }
}

export function IsTaPayment(taObj:TaObject): boolean{
    return taObj instanceof TaPayment;
}