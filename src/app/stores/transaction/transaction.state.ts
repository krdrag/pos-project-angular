import { UpdateTransaction } from './transaction.actions';
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

    @Action(UpdateTransaction)
    create({getState, patchState }: StateContext<TransactionStateModel>, 
                     { payload }: UpdateTransaction) {
        const state = getState();
        patchState({
            transaction: payload
        })
    }
}