import { TransactionState } from './stores/transaction/transaction.state';
import { TransactionService } from './services/transaction.service';
import { WorkstationState } from './stores/workstation/workstation.state';
import { SetWorkstation } from './stores/workstation/workstation.actions';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Workstation } from './models/workstation.model';
import { WorkstationService } from './services/workstation.service';
import { Transaction } from './models/transaction.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Select(TransactionState.getTransaction) transaction$: Observable<Transaction>

  constructor(private store: Store, private wsService: WorkstationService, private tsService: TransactionService){
    
  }

  ngOnInit(): void {
    var workstation = this.wsService.getWorkstationData();
    this.store.dispatch(new SetWorkstation({id: workstation.id, storeId: workstation.storeId}));

    var wsData = this.store.selectSnapshot(WorkstationState.getWorkstation);
    console.log(wsData);
  }

  scanBarcode(barcode: string): void {
    var result = this.tsService.ScanBarcode(barcode);
    if(!result) console.log("Unknown barcode");
  }

  
  pay(amountText: string): void {
    var amount = Number(amountText);
    if(Number.isNaN(amount)) 
    {
      console.log("Not a number!");
      return;
    }

    var result = this.tsService.Pay(amount);

    if(!result) console.log("Payment failed!");
  }

}
