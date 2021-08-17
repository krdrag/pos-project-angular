import { Component, Input } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faMoneyBill, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { TransactionService } from './../../../services/transaction/transaction.service';

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './payment-modal-component.html',
    styleUrls: ['./payment-modal-component.css']
})
export class PaymentModalComponent {
    @Input() name;

    faMoneyBill = faMoneyBill;
    faCreditCard = faCreditCard;
  
    constructor( private taService: TransactionService,
                 public activeModal: NgbActiveModal, 
                 private translate: TranslateService) 
    {
    }

    Pay(mediaType: number){
        this.taService.Pay(mediaType);
        this.activeModal.close('Close click')
    }

  }