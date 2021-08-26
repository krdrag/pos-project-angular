import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-footer-virtual-receipt',
  templateUrl: './footer-virtual-receipt.component.html',
  styleUrls: ['./footer-virtual-receipt.component.css']
})
export class FooterVirtualReceiptComponent implements OnInit {

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }

}
