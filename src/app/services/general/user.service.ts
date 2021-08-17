import { UserState } from '../../stores/user/user.state';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Users } from '../../mock/users.mock';
import { User } from '../../models/user.model';
import { Login, Logout } from '../../stores/user/user.actions';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  outputDateFormat = 'DD-MM-YYYY';
  tokenValidity = 5;

  constructor(private store: Store) { }

  CheckToken(): boolean{

    const userID = window.localStorage.getItem('Cashier');
    const expiryDate = window.localStorage.getItem('ExpiryDate');

    if(userID === undefined || userID === null) return false;

    if(moment() > moment(expiryDate, this.outputDateFormat))
    {
      // Token has expired
      this.ResetLocalStorage();
      return false;
    }

    // Refresh token
    this.SetExpiryToken();

    // Do login
    const userData = Users.find(h => h.cashierID === userID);

    var user: User = {
      cashierID: userData.cashierID,
      role: userData.role,
      operatorName: userData.name,
      operatorLastName: userData.lastName
    }
    this.store.dispatch(new Login(user));

    return true;

  }

  GetUser(): User {
    return this.store.selectSnapshot(UserState.getUser);
  }

  IsLoggedIn(): boolean {
    var user = this.store.selectSnapshot(UserState.getUser);

    return user !== undefined;
  }

  Login(userID: string, password: string): boolean{
    const userData = Users.find(h => h.cashierID === userID);

    if(userData === undefined) return false;

    if(userData.password !== password) return false;

    var user: User = {
      cashierID: userData.cashierID,
      role: userData.role,
      operatorName: userData.name,
      operatorLastName: userData.lastName
    }

    this.store.dispatch(new Login(user));

    window.localStorage.setItem('Cashier', userData.cashierID);
    this.SetExpiryToken();

    return true;

  }

  Logout(){
    this.store.dispatch(new Logout());
    this.ResetLocalStorage();
  }

  private SetExpiryToken(){
    const expiryDate = moment(new Date(), this.outputDateFormat).add(this.tokenValidity, 'days').format(this.outputDateFormat);
    window.localStorage.setItem('ExpiryDate', expiryDate);
  }

  private ResetLocalStorage(){
    window.localStorage.removeItem('Cashier');
    window.localStorage.removeItem('ExpiryDate');
  }
  
}
