import { Component, Input, OnInit } from '@angular/core';
import { TaArticle } from 'src/app/models/TaObjects/taArticle.model';
import { ArticleService } from '../../../services/transaction/article.service'
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
    this.artService.VoidArticle(this.article);
  }

}
