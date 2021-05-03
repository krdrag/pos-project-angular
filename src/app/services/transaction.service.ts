import { StartTransaction } from './../stores/transaction/transaction.actions';
import { WorkstationState } from './../stores/workstation/workstation.state';
import { TransactionState } from './../stores/transaction/transaction.state';
import { ArticleService } from './article.service';
import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { Store } from '@ngxs/store';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private store: Store, private articleService: ArticleService) { }

  ScanBarcode(barcode: string): boolean {

    // Verify barcode
    var art = this.articleService.CheckBarcode(barcode);
    
    if(art === null) return false;
    
    var transaction = this.store.selectSnapshot(TransactionState.getTransaction);
    
    // Start transaction if needed
    if(transaction === undefined) {
      this.store.dispatch(new StartTransaction(this.StartTransaction()));
      transaction = this.store.selectSnapshot(TransactionState.getTransaction);
    }

    // Add item to TA

    return true;
  }

  private StartTransaction(): Transaction {

    var wsData = this.store.selectSnapshot(WorkstationState.getWorkstation);

    return {
      transactionID: uuidv4(),
      startDate: new Date,
      endDate: new Date,
      storeID: wsData.storeId,
      workstationID: wsData.id
    }
  }
}
