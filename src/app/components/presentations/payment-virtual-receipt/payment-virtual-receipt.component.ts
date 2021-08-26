import { Component, Input, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { TaPayment } from './../../../models/TaObjects/taPayment.model';

@Component({
  selector: 'app-payment-virtual-receipt',
  templateUrl: './payment-virtual-receipt.component.html',
  styleUrls: ['./payment-virtual-receipt.component.css']
})
export class PaymentVirtualReceiptComponent implements OnInit {

  @Input() payment: TaPayment;

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }

  getMediaName(): string{
    if(this.payment.mediaType == 0)
    {
      return this.translate.instant("payment.payment-cash");
    }
    else if(this.payment.mediaType == 1)
    {
      return this.translate.instant("payment.payment-credit-card");
    }
  }

}
