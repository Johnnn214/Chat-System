import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import{ HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3000'
  constructor(private http: HttpClient, private router: Router) { }

  updateUser(user:User){
    return this.http.post<User>(`${this.baseUrl}/api/updateuser`, { user: user});
  }

  login(email: string, password: string): Observable<User> {
    const loginData = { email: email, password: password };
    return this.http.post<User>(`${this.baseUrl}/api/auth`, loginData);
  }

  isLoggedin(){
    if (localStorage.getItem('currentUser')){
      return true;
    }else{
      return false;
    }
  }

  setCurrentuser(newuser:User){
    localStorage.setItem('currentUser',JSON.stringify(newuser));
  }
  getCurrentuser(){
    return localStorage.getItem('currentUser');
  }

  logout(event:any){
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('');

  }

}