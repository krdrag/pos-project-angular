import { StartTransaction, AddTaObj, RemoveTotal, AddTotal, CloseTransaction } from './transaction.actions';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Transaction } from 'src/app/models/transaction.model';
import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';
import {IsTaTotal, TaTotal} from "./../../models/TaObjects/taTotal.model"
import { TaObject } from 'src/app/models/taObject.model';
import { IsTaArticle, TaArticle } from 'src/app/models/TaObjects/taArticle.model';

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

    @Selector()
    static getTotal(state: TransactionStateModel): TaTotal {
        return state.transaction.objects.find(x => IsTaTotal(x)) as TaTotal
    }

    @Action(StartTransaction)
    create({getState, patchState }: StateContext<TransactionStateModel>, 
                     { payload }: StartTransaction) {
        const state = getState();
        patchState({
            transaction: payload
        })
    }

    @Action(CloseTransaction)
    close({getState, patchState }: StateContext<TransactionStateModel>) {
        const state = getState();
        patchState({
            transaction: {
                ...state.transaction,
                closed: true
            }
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

    @Action(RemoveTotal)
    removeTotal({getState, setState }: StateContext<TransactionStateModel>) {
        const state = getState();
        var curTotal = state.transaction.objects.find(x => IsTaTotal(x))
        if(curTotal !== undefined)
        {
            const filteredArray = state.transaction.objects.filter(x => !IsTaTotal(x));

            setState({
                ...state,
                transaction: {
                    ...state.transaction,
                    objects: filteredArray
                }},
            );
        }
    }

    @Action(AddTotal)
    addTotal({getState, patchState }: StateContext<TransactionStateModel>) {
        const state = getState();
        
        var article: TaArticle;
        var value: number = 0;
        var quantity: number = 0;

        state.transaction.objects.forEach(taObj => {
            if(IsTaArticle(taObj)){
                article = <TaArticle>taObj;
                value += article.price;
                // Rounding to 2 decimal places
                value = Math.round((value + Number.EPSILON) * 100) / 100
                quantity++;
            }
        });

        var taToal = new TaTotal({
            totalToPay: value,
            articleQuantity: quantity
        });

        patchState({
            transaction: {
                ...state.transaction,
                objects: [
                    ...state.transaction.objects,
                    taToal
                ]
            }
        });
    }
}