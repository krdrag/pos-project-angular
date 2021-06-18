import { TransactionService } from '../../../services/transaction/transaction.service';
import { Component, Input, OnInit } from '@angular/core';
import { faTshirt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-article-button',
  templateUrl: './article-button.component.html',
  styleUrls: ['./article-button.component.css']
})
export class ArticleButtonComponent implements OnInit {

  @Input() articleID: string;

  faTshirt = faTshirt;

  constructor(private taServcie: TransactionService ) { }

  ngOnInit(): void {
  }

  AddItem(){
    this.taServcie.ScanBarcode(this.articleID);
  }
}
