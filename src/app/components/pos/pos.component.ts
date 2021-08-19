import { Component, OnInit } from '@angular/core';
import { faShoppingCart, faCartPlus, faShoppingBag, faCog} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  faShoppingCart = faShoppingCart;
  faCartPlus = faCartPlus;
  faShoppingBag = faShoppingBag;
  faCog = faCog;

  constructor() { }

  ngOnInit(): void {
  }
}
