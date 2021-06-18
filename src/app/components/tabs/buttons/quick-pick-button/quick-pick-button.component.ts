import { TransactionService } from './../../../../services/transaction/transaction.service';
import { Component, Input, OnInit } from '@angular/core';
import { faTshirt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-quick-pick-button',
  templateUrl: './quick-pick-button.component.html',
  styleUrls: ['./quick-pick-button.component.css']
})
export class QuickPickButtonComponent implements OnInit {

  @Input() articleID: string;

  faTshirt = faTshirt;

  constructor(private taServcie: TransactionService) { }

  ngOnInit(): void {
  }

  AddItem(){
    this.taServcie.ScanBarcode(this.articleID);
  }
}
