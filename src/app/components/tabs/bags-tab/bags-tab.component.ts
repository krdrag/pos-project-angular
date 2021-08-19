import { Component, OnInit } from '@angular/core';
import { BagsTabArticles } from 'src/app/mock/tabsBag.mock';

@Component({
  selector: 'app-bags-tab',
  templateUrl: './bags-tab.component.html',
  styleUrls: ['./bags-tab.component.css']
})
export class BagsTabComponent implements OnInit {

  bags = BagsTabArticles
  
  constructor() { }

  ngOnInit(): void {
  }

}
