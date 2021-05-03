import { TaArticle } from './../models/TaObjects/taArticle.model';
import { UpdateTransaction } from './../stores/transaction/transaction.actions';
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
      transaction = this.StartTransaction();
    }

    // Add item to TA
    var taObj = this.CreateTaArticle(art);
    transaction.objects = [...transaction.objects, taObj];

    this.store.dispatch(new UpdateTransaction(transaction));
    
    transaction = this.store.selectSnapshot(TransactionState.getTransaction);
    console.log(transaction)

    return true;
  }

  private StartTransaction(): Transaction {

    var wsData = this.store.selectSnapshot(WorkstationState.getWorkstation);

    return {
      transactionID: uuidv4(),
      startDate: new Date,
      endDate: new Date,
      objects: [],
      storeID: wsData.storeId,
      workstationID: wsData.id
    }
  }

  private CreateTaArticle(article: Article): TaArticle {
    return {
      seqNmbr: 1,
      itemID: article.itemID
    }
  }
}
