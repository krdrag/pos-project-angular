import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { TaArticle } from './../../../models/TaObjects/taArticle.model';
import { ArticleService } from './../../../services/transaction/article.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  @Input() article: TaArticle;

  editForm: FormGroup

  constructor( private artService: ArticleService,
               public activeModal: NgbActiveModal,
               private fb: FormBuilder,
               private translate: TranslateService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.editForm = this.fb.group({
      newPrice: ['', Validators.required]
    });
  }

  onSubmit() {
    var newPrice = Number(this.editForm.value.newPrice);

    var result = this.artService.EditArticle(this.article, newPrice);

    this.activeModal.close('Sumbit');
  }

}
