import { Articles } from '../../mock/articles.mock';
import { Article } from '../../models/article.model';
import { Injectable } from '@angular/core';
import { TaArticle } from '../../models/TaObjects/taArticle.model';
import { Store } from '@ngxs/store';
import { AddTaObj, AddTotal, RemoveTotal, VoidTaObj } from '../../stores/transaction/transaction.actions';

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
      price: article.price,
      name: article.name,
      size: article.size
    });

    this.store.dispatch(new AddTaObj(taObj));
    return true;
  }

  VoidArticle(article: TaArticle): boolean {
    this.store.dispatch(new RemoveTotal());

    this.store.dispatch(new VoidTaObj(article));

    this.store.dispatch(new AddTotal());

    return true;
  }

  EditArticle(something: any) {
    
  }

  GetArticle(barcode: string): Article {
    return Articles.find(h => h.ID == barcode) as Article;
  }
}
