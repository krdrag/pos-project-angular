import { ScanBarcode } from './Transaction.actions';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';


export class TransactionStateModel {
    transaction: Transaction;
}

@State<TransactionStateModel>({
    name: 'transaction'
})
@Injectable()
export class TransactionState {
    
    @Selector()
    static getTransaction(state: TransactionStateModel) {
        return state.transaction;
    }

    // @Action(ScanBarcode)
    // ScanBarcode({getState, patchState }: StateContext<TransactionStateModel>, 
    //             { barcode }: ScanBarcode) {
        
        
        
        
    //                 const state = getState();




    //     patchState({
    //         workstation: payload
    //     })
    // }


    /*
    @Selector()
    static getWorkstation(state: WorkstationStateModel) {
        return state.workstation
    }

    @Action(SetWorkstation)
    add({getState, patchState }: StateContext<WorkstationStateModel>, { payload }: SetWorkstation) {
        const state = getState();
        patchState({
            workstation: payload
        })
    }
    */
}