import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '../models/group';
import { Observable ,of ,from,BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }
  private _currentgroup = new BehaviorSubject<Group>(<Group>{})
  readonly currentgroup$ = this._currentgroup.asObservable();
  getAllGroups(){
    return this.http.post<any>('http://localhost:3000/api/getgroups',{});
  }
  setallgroup(grouplist:Array<Group>){
    localStorage.setItem('allGroup',JSON.stringify(grouplist));
  }
  getallgroup(){
    return localStorage.getItem('allgroup');
  }
  
  setcurrentgroup(group:Group){
    this._currentgroup.next(group)
    sessionStorage.setItem('currentGroup',JSON.stringify(group));
  }

  setadmingrouplist(grouplist:Array<Group>){
    sessionStorage.setItem('adminGrouplist',JSON.stringify(grouplist));
  }
  getadmingrouplist(){
    return sessionStorage.getItem('adminGrouplist');
  }
  setsupergrouplist(grouplist:Array<Group>){
    sessionStorage.setItem('superGrouplist',JSON.stringify(grouplist));
  }
  getsupergrouplist(){
    return sessionStorage.getItem('superGrouplist');
  }

  setAvailablegrouplist(grouplist:Array<Group>){
    sessionStorage.setItem('availableGrouplist',JSON.stringify(grouplist));
  }
  getAvailablegrouplist(){
    return sessionStorage.getItem('availableGrouplist');
  }
  

}
