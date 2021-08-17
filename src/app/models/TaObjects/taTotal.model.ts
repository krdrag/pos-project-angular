import { TaObject } from "../taObject.model";

export class TaTotal implements TaObject {
    totalToPay: number;
    taxAmount: number;
    totalNet: number;
    articleQuantity: number;

    public constructor(init?:Partial<TaTotal>) {
        Object.assign(this, init);
    }

}

export function IsTaTotal(taObj:TaObject): boolean{
    return taObj instanceof TaTotal;
}