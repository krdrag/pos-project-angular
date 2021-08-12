import { ArticleService } from './../../../../services/transaction/article.service';
import { Article } from './../../../../models/article.model';
import { TransactionService } from './../../../../services/transaction/transaction.service';
import { Component, Input, OnInit } from '@angular/core';
import { faTshirt } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quick-pick-button',
  templateUrl: './quick-pick-button.component.html',
  styleUrls: ['./quick-pick-button.component.css']
})
export class QuickPickButtonComponent implements OnInit {

  @Input() articleID: string;

  article: Article;

  faTshirt = faTshirt;

  constructor(private taServcie: TransactionService, private artService: ArticleService, private toastr: ToastrService) { }

  ngOnInit(): void {
    if(this.articleID){
      this.article = this.artService.GetArticle(this.articleID);

      if(this.article === undefined) console.error(`Article not found ${this.articleID}`);
    }
  }

  AddItem(){
    var result = this.taServcie.ScanBarcode(this.articleID);

    if(result)
    {
      this.toastr.success(`${this.article.name} scanned!`, "Success", {
        positionClass: 'toast-top-center',
        timeOut: 2000
      });
    }
    else
    {
      this.toastr.error(`There was en error when scanning ${this.article.name}!`, "Failure", {
        positionClass: 'toast-top-center',
        timeOut: 2000
      });
    }
  }
}
