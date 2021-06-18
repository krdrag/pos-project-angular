import { TransactionService } from './../../services/transaction/transaction.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  constructor(private taPayment: TransactionService) { }

  ngOnInit(): void {
  }

  Pay(){
    this.taPayment.Pay();
  }

}
