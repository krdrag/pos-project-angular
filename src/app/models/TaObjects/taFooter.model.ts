import { TaObject } from "../taObject.model";

export class TaFooter implements TaObject {

    public constructor(init?:Partial<TaFooter>) {
        Object.assign(this, init);
    }
}

export function IsTaFooter(taObj:TaObject): boolean{
    return taObj instanceof TaFooter;
}