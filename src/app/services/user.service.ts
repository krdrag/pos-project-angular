import { UserState } from './../stores/user/user.state';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Users } from '../mock/users.mock';
import { User } from '../models/user.model';
import { Login, Logout } from '../stores/user/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private store: Store) { }

  IsLoggedIn(): boolean{
    var user = this.store.selectSnapshot(UserState.getUser);

    return user !== undefined;
  }

  Login(userID: string, password: string): boolean{
    const userData = Users.find(h => h.cashierID === userID);

    if(userData === undefined) return false;

    if(userData.password !== password) return false;

    var user: User = {
      cashierID: userData.cashierID,
      role: userData.role
    }

    this.store.dispatch(new Login(user));

    var user = this.store.selectSnapshot(UserState.getUser);
    console.log(user);

    return true;

  }

  Logout(){
    this.store.dispatch(new Logout());
  }
  
}
