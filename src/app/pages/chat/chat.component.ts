import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
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
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the channel ID from the route parameters
    this.route.params.subscribe(params => {
      this.channel = params['channelId'];
      this.initIoConnection();
    });

    this.currentUser = this.authService.getCurrentuser();
    this.currentUser = JSON.parse(this.currentUser);

    this.socketService.getchathistory(this.channel).subscribe((chatHistory: any[]) => {
      // Handle the chat history data here
      this.messagesin = chatHistory;
      console.log(this.messagesin);
    });
  }

  private initIoConnection() {
    this.socketService.initSocket();
    this.socketService.joinChannel(this.channel);
  
    this.socketService.getNewMessage().subscribe((data: any) => {
      console.log(data);
      const newMsg: Msg = {
        message: data.message,
        timestamp: new Date(),
        username: data.username 
      };
      console.log("messagereceived", newMsg);
      this.messagesin.push(newMsg);
    });
  }

  send() {
    console.log('Sending message:', this.messageout); // Add this line for debugging
    if (this.messageout) {
      this.socketService.sendMessage(this.channel, this.messageout, this.currentUser.username);
      this.messageout = '';
    } else {
      console.log('No Message');
    }
  }
  leave(){
    this.socketService.leaveChannel(this.channel);
    this.router.navigate(['/group']);
  }
}