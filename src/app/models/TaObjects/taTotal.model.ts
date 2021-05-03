import { TaObject } from "../taObject.model";

export class TaTotal implements TaObject {
    totalToPay: number;

    public constructor(init?:Partial<TaTotal>) {
        Object.assign(this, init);
    }
    
    GetVirtualReceiptLine(): string {
        return `<span> Total: ${this.totalToPay}</span>`
    }

}

export function IsTaTotal(taObj:TaObject): boolean{
    return taObj instanceof TaTotal;
}