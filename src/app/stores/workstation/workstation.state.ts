import { SetWorkstation } from './workstation.actions';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Workstation } from './../../models/workstation.model';
import { Injectable } from '@angular/core';


export class WorkstationStateModel {
    workstation: Workstation;
}

@State<WorkstationStateModel>({
    name: 'workstation'
})
@Injectable()
export class WorkstationState {
    
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

}