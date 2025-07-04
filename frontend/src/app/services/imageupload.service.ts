import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageuploadService {

  constructor(private http: HttpClient) {}
  // uploading image
  imgupload(fd:any){
    return this.http.post<any>('http://localhost:3000/api/upload', fd)
  }
  
}
