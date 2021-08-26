import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { User } from "./../../models/user.model";
import { Login, Logout } from "./user.actions";

export class UserStateModel {
    user: User;
}

@State<UserStateModel>({
    name: 'user'
})
@Injectable()
export class UserState {
    
    @Selector()
    static getUser(state: UserStateModel) {
        return state.user
    }

    @Action(Login)
    login({getState, patchState }: StateContext<UserStateModel>, { payload }: Login) {
        const state = getState();
        patchState({
            user: payload
        })
    }

    @Action(Logout)
    logout({getState, patchState }: StateContext<UserStateModel>) {
        const state = getState();
        patchState({
            user: undefined
        })
    }

}