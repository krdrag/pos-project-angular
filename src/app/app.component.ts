import { WorkstationState } from './stores/workstation/workstation.state';
import { SetWorkstation } from './stores/workstation/workstation.actions';
import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Workstation } from './models/workstation.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  workstation: Workstation;
  @Select(WorkstationState.getWorkstation) workstation$: Observable<Workstation>

  constructor(private store: Store){
    
  }

  setWorkstation(id, storeID) {
    this.store.dispatch(new SetWorkstation({id: id, storeId: storeID}))
    this.workstation = this.store.selectSnapshot(WorkstationState.getWorkstation);
    console.log(this.workstation);

  }
  


}
