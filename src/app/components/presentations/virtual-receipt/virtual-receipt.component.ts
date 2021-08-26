import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { TaObject } from './../../../models/taObject.model';
import { IsTaArticle } from './../../../models/TaObjects/taArticle.model';
import { IsTaPayment } from './../../../models/TaObjects/taPayment.model';
import { IsTaFooter } from './../../../models/TaObjects/taFooter.model';
import { IsTaTotal, TaTotal } from './../../../models/TaObjects/taTotal.model';
import { Transaction } from './../../../models/transaction.model';
import { TransactionState } from './../../../stores/transaction/transaction.state';

@Component({
  selector: 'app-virtual-receipt',
  templateUrl: './virtual-receipt.component.html',
  styleUrls: ['./virtual-receipt.component.css']
})
export class VirtualReceiptComponent implements OnInit {

  @Select(TransactionState.getTransaction) transaction$: Observable<Transaction>

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  IsTaArticle(taobj: TaObject): boolean {
    return IsTaArticle(taobj);
  }

  IsTaPayment(taobj: TaObject): boolean {
    return IsTaPayment(taobj);
  }

  IsTaTotal(taobj: TaObject): boolean {
    return IsTaTotal(taobj);
  }

  IsTaFooter(taobj: TaObject): boolean {
    return IsTaFooter(taobj);
  }

  GetTotal(): TaTotal {
    return this.store.selectSnapshot(TransactionState.getTotal);
  }

}
