import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import{ HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }


  isLoggedin(){
    if (sessionStorage.getItem('currentUser')){
      return true;
    }else{
      return false;
    }
  }

  login(email:string,password:string){
    return this.http.post<User>('http://localhost:3000/api/auth', { email: email , password: password});
  }

  setCurrentuser(newuser:User){
    sessionStorage.setItem('currentUser',JSON.stringify(newuser));
  }
  getCurrentuser(){
    return sessionStorage.getItem('currentUser');
  }

  logout(event:any){
    sessionStorage.removeItem('currentUser');
    this.router.navigateByUrl('');

  }

}