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

  getAdminGroups(username: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.baseUrl}/api/getgroups/admin/${username}`);
  }

  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(`${this.baseUrl}/api/getgroups`, group);
  }

  deleteGroup(groupId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/getgroups/${groupId}`);
  }


}
