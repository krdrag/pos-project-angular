import { Component, OnInit } from '@angular/core';
import { QuickPickArticles } from 'src/app/mock/quickPick.mock';

@Component({
  selector: 'app-quick-pick-tab',
  templateUrl: './quick-pick-tab.component.html',
  styleUrls: ['./quick-pick-tab.component.css']
})
export class QuickPickTabComponent implements OnInit {

  articles = QuickPickArticles

  constructor() { }

  ngOnInit(): void {
  }

}
