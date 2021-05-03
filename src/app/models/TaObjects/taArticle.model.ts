import { Article } from "../article.model";
import { TaObject } from "../taObject.model";

export class TaArticle implements TaObject, Article {
    itemID: string;
    itemPrice: number;
    

    public constructor(init?:Partial<TaArticle>) {
        Object.assign(this, init);
    }
    
    GetVirtualReceiptLine(): string {
        return `<span> Article: ${this.itemID} Price: ${this.itemPrice} </span>`
    }

}

export function IsTaArticle(taObj:TaObject): boolean{
    return taObj instanceof TaArticle;
}