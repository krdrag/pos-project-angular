import { TaTotal } from './../../../models/TaObjects/taTotal.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-total-virtual-receipt',
  templateUrl: './total-virtual-receipt.component.html',
  styleUrls: ['./total-virtual-receipt.component.css']
})
export class TotalVirtualReceiptComponent implements OnInit {

  @Input() total: TaTotal;

  constructor() { }

  ngOnInit(): void {
  }

}
