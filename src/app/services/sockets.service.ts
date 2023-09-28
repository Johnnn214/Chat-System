import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Msg } from '../models/msg';
import { io } from 'socket.io-client';


const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  private socket:any;
  messages = signal<Msg[]>([]);
  constructor() { }

  initSocket(){
    this.socket = io(SERVER_URL);
    return ()=>{this.socket.disconnect();}
  }

  public send(message: string){
    this.socket.emit('message',message);

  }
  getNewMessage(){
    return this.obsFromIO(this.socket,'message');
  }
 

  private obsFromIO(io:any,eventname:any){
    return new Observable(observer=>{
      io.on(eventname,(data:string)=>{
        let msgdata:Msg = new Msg(data,new Date,1);
      
        this.messages.mutate(messages =>{messages.push(msgdata)});
        observer.next(this.messages())
      });
    });
  }

}
