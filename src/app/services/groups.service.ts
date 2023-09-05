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

  setcurrentgroup(group:Group){
    this._currentgroup.next(group)
    sessionStorage.setItem('currentGroup',JSON.stringify(group));
  }
  getCurrentgroup(){
    return sessionStorage.getItem('currentGroup');
  }

  setCurrentgrouplist(grouplist:Array<Group>){
    sessionStorage.setItem('currentGrouplist',JSON.stringify(grouplist));
  }
  getCurrentgrouplist(){
    return sessionStorage.getItem('currentGrouplist');
  }
  setAvailablegrouplist(grouplist:Array<Group>){
    sessionStorage.setItem('availableGrouplist',JSON.stringify(grouplist));
  }
  getAvailablegrouplist(){
    return sessionStorage.getItem('availableGrouplist');
  }
  

}
