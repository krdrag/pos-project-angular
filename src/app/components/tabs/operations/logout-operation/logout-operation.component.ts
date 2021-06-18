import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/general/user.service';

@Component({
  selector: 'app-logout-operation',
  templateUrl: './logout-operation.component.html',
  styleUrls: ['./logout-operation.component.css']
})
export class LogoutOperationComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  Logout(){
    this.userService.Logout();
    this.router.navigateByUrl('/login', {replaceUrl: true});
  }

}
