import { Articles } from './../mock/articles.mock';
import { Article } from './../models/article.model';
import { Injectable } from '@angular/core';
import { TaArticle } from '../models/TaObjects/taArticle.model';
import { Store } from '@ngxs/store';
import { AddTaObj } from '../stores/transaction/transaction.actions';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private store: Store) { }

  CheckBarcode(barcode: string): boolean{
    const article = Articles.find(h => h.itemID == barcode) as Article;

    return article !== undefined;
  }

  CreateTaArticle(barcode: string): boolean{
    var article = Articles.find(h => h.itemID == barcode) as Article;

    var taObj = new TaArticle({
      itemID: article.itemID,
      itemPrice: article.itemPrice
    });

    this.store.dispatch(new AddTaObj(taObj));
    return true;
  }
}
