import { StartTransaction, RemoveTotal, AddTotal, CloseTransaction } from '../../stores/transaction/transaction.actions';
import { PaymentService } from './payment.service';
import { ArticleService } from './article.service';
import { WorkstationState } from '../../stores/workstation/workstation.state';
import { TransactionState } from '../../stores/transaction/transaction.state';
import { Transaction } from '../../models/transaction.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private store: Store, 
              private articleService: ArticleService,
              private paymentService: PaymentService) { }

  ScanBarcode(barcode: string): boolean {

    // Verify barcode
    var barcodeValid = this.articleService.CheckBarcode(barcode);
    
    if(!barcodeValid) return false;
    
    var transaction = this.store.selectSnapshot(TransactionState.getTransaction);
    
    // Start transaction if needed
    if(transaction === undefined || transaction.closed) {
      this.store.dispatch(new StartTransaction(this.CreateTransaction()))
    }

    // Remove Total
    this.store.dispatch(new RemoveTotal());

    // Add item to TA
    this.articleService.CreateTaArticle(barcode);

    // Recalculate Total
    this.store.dispatch(new AddTotal());

    return true;
  }

  Pay(): boolean{

    var transaction = this.store.selectSnapshot(TransactionState.getTransaction);

    if(transaction === undefined || transaction.closed) return false;

    this.paymentService.CreateTaPayment(transaction);

    this.store.dispatch(new CloseTransaction());

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
      closed: false
    }
  }
}
