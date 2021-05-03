import { Articles } from './../mock/articles.mock';
import { Article } from './../models/article.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor() { }

  CheckBarcode(barcode: string): Article | void{
    const article = Articles.find(h => h.itemID === barcode) as Article;

    return article === undefined ? null : article;
  }
}
