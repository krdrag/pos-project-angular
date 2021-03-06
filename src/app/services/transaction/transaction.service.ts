import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { v4 as uuidv4 } from 'uuid';
import { ToastrService } from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import { StartTransaction, RemoveTotal, AddTotal, CloseTransaction } from '../../stores/transaction/transaction.actions';
import { PaymentService } from './payment.service';
import { ArticleService } from './article.service';
import { WorkstationState } from '../../stores/workstation/workstation.state';
import { TransactionState } from '../../stores/transaction/transaction.state';
import { Transaction } from '../../models/transaction.model';
import { MediaTypes } from '../../mock/media.mock';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private store: Store, 
              private articleService: ArticleService,
              private paymentService: PaymentService,
              private translate: TranslateService,
              private toastr: ToastrService) { }

  ScanBarcode(barcode: string): boolean {

    // Verify barcode
    var barcodeValid = this.articleService.CheckBarcode(barcode);
    
    if(!barcodeValid) 
    {
      this.ShowToast(false, "general.failure", "scanning.invalid-barcode");
      return false;
    }
    
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

    this.ShowToast(true, "general.success", "scanning.scanning-success");
    return true;
  }

  Pay(mediaType: number): boolean{

    const media = MediaTypes.find(h => h.mediaID == mediaType);

    if(media === undefined)
    {
      this.ShowToast(false, "general.failure", "payment.unknown-medium");
      console.error(`Payment medium ${mediaType} does not exist`);
      return;
    }

    var transaction = this.store.selectSnapshot(TransactionState.getTransaction);

    if(transaction === undefined || transaction.closed) return false;

    this.paymentService.CreateTaPayment(transaction, mediaType);

    this.store.dispatch(new CloseTransaction());

    this.ShowToast(true, "general.success", "total.payment-success");

    return true;
  }

  IsClosed(): boolean {
    var transaction = this.store.selectSnapshot(TransactionState.getTransaction);

    if(transaction == null) return true;

    return transaction.closed;
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
  
  private ShowToast(success: boolean, headerID: string, bodyID: string)
  {
    var header, msg;

    header = this.translate.instant(headerID);
    msg = this.translate.instant(bodyID);

    if(success)
    {
      this.toastr.success(msg, header, {
        positionClass: 'toast-top-center',
        timeOut: 2000
      });
    }
    else
    {
      this.toastr.error(msg, header, {
        positionClass: 'toast-top-center',
        timeOut: 2000
      });
    }
  }
}
