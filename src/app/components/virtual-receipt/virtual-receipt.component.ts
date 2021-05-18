import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/models/transaction.model';
import { TransactionState } from 'src/app/stores/transaction/transaction.state';

@Component({
  selector: 'app-virtual-receipt',
  templateUrl: './virtual-receipt.component.html',
  styleUrls: ['./virtual-receipt.component.css']
})
export class VirtualReceiptComponent implements OnInit {

  @Select(TransactionState.getTransaction) transaction$: Observable<Transaction>

  constructor() { }

  ngOnInit(): void {
  }

}
