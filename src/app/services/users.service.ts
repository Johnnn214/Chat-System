import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '../models/group';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }


  getAllUsernames(roles:string){
    return this.http.post<any>('http://localhost:3000/api/getusers',{roles: roles});
  }
  getUserinGroup(group:string){
    return this.http.post<any>('http://localhost:3000/api/getgroupsuser',{group: group});
  }
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
