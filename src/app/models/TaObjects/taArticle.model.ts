import { Article } from "../article.model";
import { TaObject } from "../taObject.model";

export class TaArticle implements TaObject, Article {
    ID: string;
    name: string;
    size: string;
    price: number;
    

    public constructor(init?:Partial<TaArticle>) {
        Object.assign(this, init);
    }
    
    
    GetVirtualReceiptLine(): string {
        return `<span class='ta-article'> Article: ${this.ID} Price: ${this.price} </span>`


    }

}

export function IsTaArticle(taObj:TaObject): boolean{
    return taObj instanceof TaArticle;
}