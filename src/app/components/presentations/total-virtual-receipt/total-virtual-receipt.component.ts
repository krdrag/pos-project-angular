import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PaymentModalComponent } from './../../modals/payment-modal/payment-modal-component'
import { TransactionService } from './../../../services/transaction/transaction.service';
import { TaTotal } from './../../../models/TaObjects/taTotal.model';

@Component({
  selector: 'app-total-virtual-receipt',
  templateUrl: './total-virtual-receipt.component.html',
  styleUrls: ['./total-virtual-receipt.component.css']
})
export class TotalVirtualReceiptComponent implements OnInit {

  @Input() total: TaTotal;

  constructor( private modalService: NgbModal,
               private taService: TransactionService,
               private translate: TranslateService) { }

  ngOnInit(): void {
  }

  Payment(){
    this.modalService.open(PaymentModalComponent, { centered: true });
  }

  IsValid(){
    return this.total.articleQuantity != 0 && !this.taService.IsClosed();
  }

}
