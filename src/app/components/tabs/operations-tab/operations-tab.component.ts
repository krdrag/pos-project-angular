import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/general/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-operations-tab',
  templateUrl: './operations-tab.component.html',
  styleUrls: ['./operations-tab.component.css']
})
export class OperationsTabComponent implements OnInit {

  constructor( private userService: UserService,
               private router: Router,
               private translate: TranslateService) { }

  ngOnInit(): void {
  }

  Logout(){
    this.userService.Logout();
    this.router.navigateByUrl('/login', {replaceUrl: true});
  }

}
