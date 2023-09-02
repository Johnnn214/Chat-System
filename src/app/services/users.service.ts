import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }


  getAllUsernames(roles:string){
    return this.http.post<any>('http://localhost:3000/api/getusers',{roles: roles});
  }

}
