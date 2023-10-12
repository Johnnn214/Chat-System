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

  // retrieves all user
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/api/getusers`);
  }
  // user creation
  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/api/createuser`, user);
  }
  // delete user
  removeUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/users/${userId}`);
  }
  // adding user to a group
  addUserInGroup(groupId: string, username: string): Observable<any> {
    const body = { username };
    return this.http.post(`${this.baseUrl}/api/groups/${groupId}/users`, body);
  }
  // get user in a particular group
  getUserInGroup(groupId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/api/groups/${groupId}/users`);
  }
   // remove user in a particular group
  removeUserFromGroup(userId: string, groupId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/groups/${groupId}/users/${userId}`);
  }
  // promote user to super admin
  promotetosuper(userid:string): Observable<any>{
    const body = { userid };
    return this.http.post(`${this.baseUrl}/api/promotetosuper/${userid}`, body);
  }
  // promote user to group admin
  promotetogroupadmin(userid:string): Observable<any>{
    const body = { userid };
    return this.http.post(`${this.baseUrl}/api/promotetoadmin/${userid}`, body);
  }
}
