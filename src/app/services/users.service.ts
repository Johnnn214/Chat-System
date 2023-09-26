import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '../models/group';
import { User } from '../models/user';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://localhost:3000'; // Update with your server route for users

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/api/getusers`);
  }

  // getUserinGroup(group: string): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.baseUrl}/group/${group}`);
  // }










  setCurrentgroupuserlist(userlist:Array<User>){
    sessionStorage.setItem('currentgroupuserlist',JSON.stringify(userlist));
  }
  getCurrentgroupuserlist(){
    return sessionStorage.getItem('currentgroupuserlist');
  }
  setCurrentuserlist(userlist:Array<User>){
    sessionStorage.setItem('currentuserlist',JSON.stringify(userlist));
  }
  getuserlist(){
    return sessionStorage.getItem('userlist');
  }
  setuserlist(userlist:Array<User>){
    sessionStorage.setItem('userlist',JSON.stringify(userlist));
  }
  getCurrentuserlist(){
    return sessionStorage.getItem('currentuserlist');
  }

  setCurrentgroupadminlist(userlist:Array<User>){
    sessionStorage.setItem('currentgroupadminlist',JSON.stringify(userlist));
  }
  getCurrentgroupadminlist(){
    return sessionStorage.getItem('currentgroupadminlist');
  }
  setCurrentsuperlist(userlist:Array<User>){
    sessionStorage.setItem('currentsuperlist',JSON.stringify(userlist));
  }
  getCurrentsuperlist(){
    return sessionStorage.getItem('currentsuperlist');
  }

}
