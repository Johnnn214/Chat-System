import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '../models/group';
import { Observable ,of ,from,BehaviorSubject} from 'rxjs';
import { Channel } from '../models/channel';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }

  private _currentgroup = new BehaviorSubject<Group>(<Group>{})
  readonly currentgroup$ = this._currentgroup.asObservable();

  private baseUrl = 'http://localhost:3000/api/groups'

  getAllGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.baseUrl}`);
  }

  getAdminGroups(id: string): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.baseUrl}/admin/${id}`);
  }

  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(`${this.baseUrl}`, group);
  }

  deleteGroup(groupId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${groupId}`);
  }

  setcurrentgroup(group:Group){
    this._currentgroup.next(group);
  }

  addChannelToGroup(groupId: string, channel: Channel): Observable<Channel> {
    const url = `${this.baseUrl}/${groupId}/channel`;
    return this.http.post<Channel>(url, channel);
  }

  getChannelsForGroup(groupId: string): Observable<any[]> {
    return this.http.get<Channel[]>(`${this.baseUrl}/${groupId}/channels`);
  }

  // Remove a channel from the current group
  removeChannelFromGroup(groupId: string, channelId: string): Observable<void> {
    const url = `${this.baseUrl}/${groupId}/channel/${channelId}`;
    return this.http.delete<void>(url);
  }

  // Join a channel within the current group
  joinChannelInGroup(groupId: string, channelId: string): Observable<void> {
    const url = `${this.baseUrl}/${groupId}/channels/${channelId}/join`;
    return this.http.post<void>(url, {});
  }

}
