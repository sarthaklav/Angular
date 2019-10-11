import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {
  currentUser: User;
  currentUserId: string;
  isLoggedIn: boolean;
  currentUserType: string;

  constructor(private httpClient: HttpClient) {
    this.currentUser = new User(null, null);
    this.isLoggedIn = false;
    this.currentUserType = null;
    this.currentUserId = null;
  }

  authenticate(email: string, password: string): Observable<any> {
    //return this.httpClient.get(`/api/retailers?email=${email}&password=${password}`);
 
    return this.httpClient.get(`/api/retailers?password=${password}`);
  }
}



