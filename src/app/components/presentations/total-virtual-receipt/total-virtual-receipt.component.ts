import { TaTotal } from './../../../models/TaObjects/taTotal.model';
import { Component, Input, OnInit } from '@angular/core';
import { TransactionService } from './../../../services/transaction/transaction.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-total-virtual-receipt',
  templateUrl: './total-virtual-receipt.component.html',
  styleUrls: ['./total-virtual-receipt.component.css']
})
export class TotalVirtualReceiptComponent implements OnInit {

  @Input() total: TaTotal;

  constructor( private taService: TransactionService,
               private translate: TranslateService) { }

  ngOnInit(): void {
  }

  Pay(){
    this.taService.Pay();
  }

  IsClosed(){
    return this.taService.IsClosed();
  }

}
