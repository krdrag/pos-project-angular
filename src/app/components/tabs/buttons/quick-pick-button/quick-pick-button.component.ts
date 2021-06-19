import { ArticleService } from './../../../../services/transaction/article.service';
import { Article } from './../../../../models/article.model';
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

  article: Article;

  faTshirt = faTshirt;

  constructor(private taServcie: TransactionService, private artService: ArticleService) { }

  ngOnInit(): void {
    if(this.articleID){
      this.article = this.artService.GetArticle(this.articleID);

      if(this.article === undefined) console.error(`Article not found ${this.articleID}`);
    }
  }

  AddItem(){
    this.taServcie.ScanBarcode(this.articleID);
  }
}
