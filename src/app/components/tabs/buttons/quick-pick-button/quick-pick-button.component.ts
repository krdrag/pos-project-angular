import { Component, Input, OnInit } from '@angular/core';
import { faTshirt, faMitten, faSocks, faHatCowboy, faTemperatureLow, faSkiing, faVolleyballBall, faSwimmer, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { ArticleService } from './../../../../services/transaction/article.service';
import { Article } from './../../../../models/article.model';
import { TransactionService } from './../../../../services/transaction/transaction.service';

@Component({
  selector: 'app-quick-pick-button',
  templateUrl: './quick-pick-button.component.html',
  styleUrls: ['./quick-pick-button.component.css']
})
export class QuickPickButtonComponent implements OnInit {

  @Input() articleID: string;

  article: Article;

  faTshirt = faTshirt;
  faMitten = faMitten;
  faSocks = faSocks;
  faHatCowboy = faHatCowboy;
  faTemperatureLow = faTemperatureLow;
  faSkiing = faSkiing;
  faVolleyballBall = faVolleyballBall;
  faSwimmer = faSwimmer;
  faShoppingBag = faShoppingBag;

  constructor(private taServcie: TransactionService, 
    private artService: ArticleService) { }

  ngOnInit(): void {
    if(this.articleID){
      this.article = this.artService.GetArticle(this.articleID);

      if(this.article === undefined) console.error(`Article not found ${this.articleID}`);
    }
  }

  AddItem(){
    this.taServcie.ScanBarcode(this.articleID);
  }

  GetArticleType(): number{
    return this.article.articleType;
  }
}
