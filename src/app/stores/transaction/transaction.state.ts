import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Transaction } from './../../models/transaction.model';
import { IsTaTotal, TaTotal} from "./../../models/TaObjects/taTotal.model"
import { IsTaArticle, TaArticle } from './../../models/TaObjects/taArticle.model';
import { TaFooter } from './../../models/TaObjects/taFooter.model';
import { StartTransaction, AddTaObj, RemoveTotal, AddTotal, CloseTransaction, VoidTaObj } from './transaction.actions';

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

        var taFooter = new TaFooter();

        patchState({
            transaction: {
                ...state.transaction,
                closed: true,
                objects: [
                    ...state.transaction.objects,
                    taFooter
                ]
            }
        });
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

    @Action(VoidTaObj)
    voidTaObj({getState, setState }: StateContext<TransactionStateModel>, 
                     { payload }: AddTaObj) {
        const state = getState();

        const filteredArray = state.transaction.objects.filter(x => x != payload);

        setState({
            ...state,
            transaction: {
                ...state.transaction,
                objects: filteredArray
            }},
        );
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

        var tax = 23;

        state.transaction.objects.forEach(taObj => {
            if(IsTaArticle(taObj)){
                article = <TaArticle>taObj;
                value += article.price;
                // Rounding to 2 decimal places
                value = Math.round((value + Number.EPSILON) * 100) / 100
                quantity++;
            }
        });

        // Simple net and tax calculation
        var taxAmount = (tax * value)/100;
        taxAmount = Math.round((taxAmount + Number.EPSILON) * 100) / 100

        var totalNet = value - taxAmount;
        totalNet = Math.round((totalNet + Number.EPSILON) * 100) / 100

        var taToal = new TaTotal({
            totalToPay: value,
            articleQuantity: quantity,
            taxAmount: taxAmount,
            totalNet: totalNet
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