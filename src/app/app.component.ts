import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import { WorkstationService } from './services/general/workstation.service';
import { Transaction } from './models/transaction.model';
import { UserService } from './services/general/user.service';
import { TransactionState } from './stores/transaction/transaction.state';
import { SetWorkstation } from './stores/workstation/workstation.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @Select(TransactionState.getTransaction) transaction$: Observable<Transaction>

  constructor(private store: Store, 
              private wsService: WorkstationService, 
              private userService: UserService,
              private translate: TranslateService){
    
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    var workstation = this.wsService.getWorkstationData();
    this.store.dispatch(new SetWorkstation({id: workstation.id, storeId: workstation.storeId}));
    
    this.userService.CheckToken();
  }

}
