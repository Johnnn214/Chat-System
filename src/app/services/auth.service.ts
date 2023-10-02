import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import{ HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, of } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  private baseUrl = 'http://localhost:3000'
  constructor(private http: HttpClient, private router: Router) {
    const isLoggedIn = localStorage.getItem('currentUser') ? true : false;
    this.isLoggedInSubject.next(isLoggedIn);
   }

  updateUser(user:User){
    return this.http.post<User>(`${this.baseUrl}/api/updateuser`, { user: user});
  }

  login(email: string, password: string): Observable<User> {
    const loginData = { email: email, password: password };
    return this.http.post<User>(`${this.baseUrl}/api/auth`, loginData);
  }

  logined(){
    const isLoggedIn = true;
    this.isLoggedInSubject.next(isLoggedIn);
  }

  isLoggedin(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  setCurrentuser(newuser:User){
    localStorage.setItem('currentUser',JSON.stringify(newuser));
  }
  getCurrentuser(){
    return localStorage.getItem('currentUser');
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.isLoggedInSubject.next(false);
    this.router.navigateByUrl('');

  }

}