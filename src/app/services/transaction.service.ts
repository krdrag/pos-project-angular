import { TaArticle } from './../models/TaObjects/taArticle.model';
import { StartTransaction, AddTaObj, RemoveTotal, AddTotal } from './../stores/transaction/transaction.actions';
import { WorkstationState } from './../stores/workstation/workstation.state';
import { TransactionState } from './../stores/transaction/transaction.state';
import { ArticleService } from './article.service';
import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { Store } from '@ngxs/store';
import { v4 as uuidv4 } from 'uuid';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private store: Store, private articleService: ArticleService) { }

  ScanBarcode(barcode: string): boolean {

    // Verify barcode
    var art = this.articleService.CheckBarcode(barcode);
    
    if(art === undefined) return false;
    
    var transaction = this.store.selectSnapshot(TransactionState.getTransaction);
    
    // Start transaction if needed
    if(transaction === undefined) {
      this.store.dispatch(new StartTransaction(this.CreateTransaction()))
      transaction = this.store.selectSnapshot(TransactionState.getTransaction);
    }

    // Remove Total
    this.store.dispatch(new RemoveTotal());

    // Add item to TA
    var taObj = this.CreateTaArticle(art, transaction);

    this.store.dispatch(new AddTaObj(taObj));
    

    // Recalculate Total
    this.store.dispatch(new AddTotal());

    transaction = this.store.selectSnapshot(TransactionState.getTransaction);
    console.log(transaction)

    //this.UpdateTotal(transaction);

    return true;
  }

  private CreateTransaction(): Transaction {

    var wsData = this.store.selectSnapshot(WorkstationState.getWorkstation);

    return {
      transactionID: uuidv4(),
      startDate: new Date,
      endDate: new Date,
      objects: [],
      storeID: wsData.storeId,
      workstationID: wsData.id,
      maxSeqNmbr: 0
    }
  }

  private CreateTaArticle(article: Article, transaction: Transaction): TaArticle {
    return new TaArticle({
      itemID: article.itemID,
      itemPrice: article.itemPrice
    });
  }

  // private UpdateTotal(transaction: Transaction): Total{
    
  //   var article: TaArticle;
  //   var value: number = 0;

  //   transaction.objects.forEach(taObj => {
  //     // if(taObj.type == 'TaArticle'){
  //     //   article = <TaArticle>taObj;
  //     //   console.log(article.itemPrice)
  //     //   value += article.itemPrice;
  //     // }
  //   });

  //   return {
  //     totalToPay: value
  //   }
  // }
}
