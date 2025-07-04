import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Msg } from '../models/msg';
import { Channel } from '../models/channel';
import { User } from '../models/user';

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class SocketsService {
  private socket: any;
  private baseUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) { }
  // getting chat history
  getchathistory(channelid: string): Observable<Msg[]> {
    return this.http.get<Msg[]>(`${this.baseUrl}/api/chat-history/${channelid}`);
  }
  // get channel by id
  getchannelbyid(channelid: string): Observable<Channel> {
    return this.http.get<Channel>(`${this.baseUrl}/api/chat/${channelid}`);
  }
  // initialise socket
  initSocket() {
    this.socket = io(SERVER_URL);
    return () => {
      this.socket.disconnect();
    };
  }
  // joining channel
  joinChannel(channel: string, user: string, message: string) {
    // Emit a 'join' event to join the specified channel
    this.socket.emit('join', {channel, user, message});
  }
  // leaving channel
  leaveChannel(channel: string,  user: string, message: string) {
    // Emit a 'leave' event to leave the specified channel
    this.socket.emit('leave', {channel,user, message});
  }
  // sending message to server
  sendMessage(channel: string, message: string, user: User, image: string) {
    // Emit a 'message' event with an object that includes the channel and message
    this.socket.emit('message', { channel, message, user , image});
  }
  // geting the broadcasted message from server
  getNewMessage(): Observable<string> {
    // Subscribe to 'message' events without specifying a channel
    return new Observable((observer) => {
      this.socket.on('message', (data: string) => {
        observer.next(data);
      });
    });
  }
}