import { ArticleService } from './../../../../services/transaction/article.service';
import { Article } from './../../../../models/article.model';
import { TransactionService } from './../../../../services/transaction/transaction.service';
import { Component, Input, OnInit } from '@angular/core';
import { faTshirt } from '@fortawesome/free-solid-svg-icons';
import {TranslateService} from '@ngx-translate/core';
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

  constructor(private taServcie: TransactionService, 
    private artService: ArticleService,
    private translate: TranslateService, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    if(this.articleID){
      this.article = this.artService.GetArticle(this.articleID);

      if(this.article === undefined) console.error(`Article not found ${this.articleID}`);
    }
  }

  AddItem(){
    var result = this.taServcie.ScanBarcode(this.articleID);

    var header, msg;
    if(result)
    {
      header = this.translate.instant("general.success");
      msg = this.translate.instant("scanning.scanning-success");

      this.toastr.success(msg, header, {
        positionClass: 'toast-top-center',
        timeOut: 2000
      });
    }
    else
    {
      header = this.translate.instant("general.failure");
      msg = this.translate.instant("scanning.scanning-failed");

      this.toastr.error(msg, header, {
        positionClass: 'toast-top-center',
        timeOut: 2000
      });
    }
  }
}
