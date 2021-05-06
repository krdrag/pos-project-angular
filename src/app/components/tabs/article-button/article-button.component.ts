import { Component, OnInit } from '@angular/core';
import { faTshirt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-article-button',
  templateUrl: './article-button.component.html',
  styleUrls: ['./article-button.component.css']
})
export class ArticleButtonComponent implements OnInit {

  faTshirt = faTshirt;

  constructor() { }

  ngOnInit(): void {
  }

  addSalt(){
    console.log("Salty!");
  }
}
