import { ArticleService } from './article.service';
import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private store: Store, private articleService: ArticleService) { }

  ScanBarcode(barcode: string): boolean{
    // Verify barcode
    var art = this.articleService.CheckBarcode(barcode);
    
    if(art === null) return false;
    // Start transaction if needed



    // Add item to TA
  }
}
