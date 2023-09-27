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

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/api/createuser`, user);
  }
  removeUser(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/users/${userId}`);
  }
  getUserInGroup(groupId: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/api/groups/${groupId}/users`);
  }
  removeUserFromGroup(userId: string, groupId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/groups/${groupId}/users/${userId}`);
  }

  addUserInGroup(groupId: string, username: string): Observable<any> {
    const body = { username };
    return this.http.post(`${this.baseUrl}/api/groups/${groupId}/users`, body);
  }

}
