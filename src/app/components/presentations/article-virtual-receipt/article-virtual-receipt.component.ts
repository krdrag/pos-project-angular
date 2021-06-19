import { Component, Input, OnInit } from '@angular/core';
import { TaArticle } from 'src/app/models/TaObjects/taArticle.model';

@Component({
  selector: 'app-article-virtual-receipt',
  templateUrl: './article-virtual-receipt.component.html',
  styleUrls: ['./article-virtual-receipt.component.css']
})
export class ArticleVirtualReceiptComponent implements OnInit {

  @Input() article: TaArticle;

  constructor() { }

  ngOnInit(): void {
  }

}
