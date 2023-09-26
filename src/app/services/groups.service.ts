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

  private baseUrl = 'http://localhost:3000'
  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.baseUrl}/api/getgroups`);
  }

  getGroupById(groupId: string): Observable<Group> {
    return this.http.get<Group>(`${this.baseUrl}/api/getgroups${groupId}`);
  }

  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(`${this.baseUrl}/api/getgroups`, group);
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
