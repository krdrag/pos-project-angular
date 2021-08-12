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
    this.showToast("Service status", "Loyalty system is online!");
  }

  DevicesStatus() {
    this.showToast("Service status", "Devices are connected!");
  }

  StoreServerStatus() {
    this.showToast("Service status", "Store server is reachable!");
  }

  showToast(title: string, message: string) {
    this.toastr.success(message, title, {
      positionClass: 'toast-top-center',
      timeOut: 2000
    });
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

}
