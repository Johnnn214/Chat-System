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

}
