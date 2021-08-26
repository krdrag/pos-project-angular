import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../../services/general/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup

  constructor(private fb: FormBuilder, 
              private userService: UserService, 
              private router: Router,
              private toastr: ToastrService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
       cashierID: ['', Validators.required ],
       password: ['', Validators.required ]
    });
  }

  onSubmit(){
    var data = this.loginForm.value;
    var result = this.userService.Login(data.cashierID, data.password);

    if(!result) {

      var header = this.translate.instant("login.login_failed_header");
      var body = this.translate.instant("login.login_failed_body");

      this.toastr.error(body, header, {
        positionClass: 'toast-top-center',
        timeOut: 3000
      });

      this.loginForm.reset();
      return;
    }

    this.router.navigate(['pos']);
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
