import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class SocketsService {
  private socket: any;

  constructor() {}

  initSocket() {
    this.socket = io(SERVER_URL);
    return () => {
      this.socket.disconnect();
    };
  }

  joinChannel(channel: string) {
    // Emit a 'join' event to join the specified channel
    this.socket.emit('join', channel);
  }

  leaveChannel(channel: string) {
    // Emit a 'leave' event to leave the specified channel
    this.socket.emit('leave', channel);
  }

  sendMessage(channel: string, message: string, username: string) {
    // Emit a 'message' event with an object that includes the channel and message
    this.socket.emit('message', { channel, message, username });
  }

  getNewMessage(): Observable<string> {
    // Subscribe to 'message' events without specifying a channel
    return new Observable((observer) => {
      this.socket.on('message', (data: string) => {
        observer.next(data);
      });
    });
  }
}