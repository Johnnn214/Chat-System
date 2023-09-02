import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(private http: HttpClient) { }


  getAllGroups(name:string){
    return this.http.post<any>('http://localhost:3000/api/getgroups',{name: name});
  }
}
