import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/general/user.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'login-failed-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Login failed!</h4>
    </div>
    <div class="modal-body">
      <p>Login or password incorrect!</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class LoginFailedModal {
  constructor(public activeModal: NgbActiveModal) {}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginForm: FormGroup

  constructor(private fb: FormBuilder, 
              private modalService: NgbModal,
              private userService: UserService, 
              private router: Router) { }

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
      this.modalService.open(LoginFailedModal);
      return;
    }

    this.router.navigate(['pos']);
  }
}
