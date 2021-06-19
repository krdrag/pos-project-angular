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
}

export function IsTaArticle(taObj:TaObject): boolean{
    return taObj instanceof TaArticle;
}