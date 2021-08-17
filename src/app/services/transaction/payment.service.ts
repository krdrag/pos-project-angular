import { TaPayment } from '../../models/TaObjects/taPayment.model';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { TaTotal } from '../../models/TaObjects/taTotal.model';
import { TransactionState } from '../../stores/transaction/transaction.state';
import { AddTaObj } from '../../stores/transaction/transaction.actions';
import { Transaction } from '../../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private store: Store) { }

  CreateTaPayment(transaction: Transaction, mediaType: number): boolean{
    
    var total = <TaTotal>transaction.objects.find(x => x instanceof TaTotal);

    var taObj = new TaPayment({
      paid: total.totalToPay,
      mediaType: mediaType
    });

    this.store.dispatch(new AddTaObj(taObj));
    return true;
  }
}
