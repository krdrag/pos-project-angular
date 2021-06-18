
import { Injectable } from '@angular/core';
import { Workstation } from '../../models/workstation.model';

@Injectable({
  providedIn: 'root'
})
export class WorkstationService {

  constructor() { }

  getWorkstationData(): Workstation{
    return {
      id: 1,
      storeId: 37
    }
  }
}
