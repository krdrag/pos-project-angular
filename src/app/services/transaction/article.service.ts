import { Articles } from '../../mock/articles.mock';
import { Article } from '../../models/article.model';
import { Injectable } from '@angular/core';
import { TaArticle } from '../../models/TaObjects/taArticle.model';
import { Store } from '@ngxs/store';
import { AddTaObj } from '../../stores/transaction/transaction.actions';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private store: Store) { }

  CheckBarcode(barcode: string): boolean{
    const article = Articles.find(h => h.ID == barcode) as Article;

    return article !== undefined;
  }

  CreateTaArticle(barcode: string): boolean{
    var article = Articles.find(h => h.ID == barcode) as Article;

    var taObj = new TaArticle({
      ID: article.ID,
      price: article.price
    });

    this.store.dispatch(new AddTaObj(taObj));
    return true;
  }

  GetArticle(barcode: string): Article {
    return Articles.find(h => h.ID == barcode) as Article;
  }
}
