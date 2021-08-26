import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { TaArticle } from './../../../models/TaObjects/taArticle.model';
import { ArticleService } from './../../../services/transaction/article.service'
import { EditArticleComponent } from './../../modals/edit-article/edit-article.component'

@Component({
  selector: 'app-article-virtual-receipt',
  templateUrl: './article-virtual-receipt.component.html',
  styleUrls: ['./article-virtual-receipt.component.css']
})
export class ArticleVirtualReceiptComponent implements OnInit {

  @Input() article: TaArticle;

  editVisible: boolean = false;

  constructor( private artService: ArticleService,
               private modalService: NgbModal,
               private toastr: ToastrService,
               private translate: TranslateService) { }

  ngOnInit(): void {
  }

  toggleEditMode()
  {
    this.editVisible = !this.editVisible;  
  }
  
  edit(){
    const modalRef = this.modalService.open(EditArticleComponent, { centered: true });
    modalRef.componentInstance.article = this.article;
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
