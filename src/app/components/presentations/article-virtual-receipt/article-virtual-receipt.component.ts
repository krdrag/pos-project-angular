import { Component, Input, OnInit } from '@angular/core';
import { TaArticle } from 'src/app/models/TaObjects/taArticle.model';
import { ArticleService } from '../../../services/transaction/article.service'
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-article-virtual-receipt',
  templateUrl: './article-virtual-receipt.component.html',
  styleUrls: ['./article-virtual-receipt.component.css']
})
export class ArticleVirtualReceiptComponent implements OnInit {

  @Input() article: TaArticle;

  editVisible: boolean = false;

  constructor( private artService: ArticleService, 
               private toastr: ToastrService,
               private translate: TranslateService) { }

  ngOnInit(): void {
  }

  toggleEditMode()
  {
    this.editVisible = !this.editVisible;  
  }
  
  edit(){
    console.log("Test");
  }

  remove(){
    var result = this.artService.VoidArticle(this.article);

    if(result)
    {
      this.showToast("transaction.transaction-operations.article-voided");
    }
  }

  showToast(message: string) {

    var header = this.translate.instant("transaction.transaction-operations.header");
    var msg = this.translate.instant(message);

    this.toastr.success(msg, header, {
      positionClass: 'toast-top-center',
      timeOut: 2000
    });
  }

}
