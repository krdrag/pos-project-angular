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

  Login(userID: string, password: string): boolean{
    const userData = Users.find(h => h.userID === userID);

    if(userData === undefined) return false;

    if(userData.password !== password) return false;

    var user: User = {
      id: userData.userID,
      role: userData.role
    }

    this.store.dispatch(new Login(user));

    return true;

  }

  Logout(){
    this.store.dispatch(new Logout());
  }
  
}
