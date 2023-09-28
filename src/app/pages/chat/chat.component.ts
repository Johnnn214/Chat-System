import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocketsService } from 'src/app/services/sockets.service';
import { Msg } from 'src/app/models/msg';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messageout = '';
  messagesin: Msg[] = [];
  channel: string = '';
  currentUser!: any;

  constructor(
    private socketService: SocketsService,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    // Get the channel ID from the route parameters
    this.route.params.subscribe(params => {
      this.channel = params['channelId'];
      this.initIoConnection();
    });

    this.currentUser = this.authService.getCurrentuser();
    this.currentUser = JSON.parse(this.currentUser);
  }

  private initIoConnection() {
    this.socketService.initSocket();
    this.socketService.joinChannel(this.channel);
  
    this.socketService.getNewMessage().subscribe((message: string) => {
      const newMsg: Msg = {
        msg: message,
        dt: new Date(),
        userid: this.currentUser.id // Replace with actual user ID
      };
      console.log("messagereceived", newMsg);
      this.messagesin.push(newMsg);
    });
  }

  send() {
    console.log('Sending message:', this.messageout); // Add this line for debugging
    if (this.messageout) {
      this.socketService.sendMessage(this.channel, this.messageout);
      this.messageout = '';
    } else {
      console.log('No Message');
    }
  }
}