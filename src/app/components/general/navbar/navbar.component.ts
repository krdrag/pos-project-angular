import { Component, OnInit } from '@angular/core';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { faHdd } from '@fortawesome/free-solid-svg-icons';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import {TranslateService} from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  faDatabase = faDatabase;
  faHdd = faHdd;
  faGift = faGift;

  constructor(private toastr: ToastrService,
              private translate: TranslateService) { }

  ngOnInit(): void {
  }

  LoyaltyStatus() {
    
    var msg = this.translate.instant("services-status.loyalty-system-online");

    this.showToast(msg);
  }

  DevicesStatus() {
    var msg = this.translate.instant("services-status.devices-connected");

    this.showToast(msg);
  }

  StoreServerStatus() {
    var msg = this.translate.instant("services-status.store-server-online");

    this.showToast(msg);
  }

  showToast(message: string) {

    var header = this.translate.instant("services-status.header");

    this.toastr.success(message, header, {
      positionClass: 'toast-top-center',
      timeOut: 2000
    });
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

}
