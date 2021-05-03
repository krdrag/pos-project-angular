import { StartTransaction, AddTaObj } from './transaction.actions';
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

    @Action(StartTransaction)
    create({getState, patchState }: StateContext<TransactionStateModel>, 
                     { payload }: StartTransaction) {
        const state = getState();
        patchState({
            transaction: payload
        })
    }

    @Action(AddTaObj)
    addTaObj({getState, patchState }: StateContext<TransactionStateModel>, 
                     { payload }: AddTaObj) {
        const state = getState();
        patchState({
            transaction: {
                ...state.transaction,
                objects: [
                    ...state.transaction.objects,
                    payload
                ]
            }
        });
    }
}