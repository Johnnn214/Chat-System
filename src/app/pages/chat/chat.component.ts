import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SocketsService } from 'src/app/services/sockets.service';
import { Msg } from 'src/app/models/msg';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Channel } from 'src/app/models/channel';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollable', { static: true }) scrollable!: ElementRef;

  messageout = '';
  messagesin: Msg[] = [];
  channel: string = '';
  currentUser!: any;
  newChannel:Channel = new Channel();

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
      this.socketService.getchannelbyid(this.channel).subscribe(data => {
        if (Array.isArray(data)) {
          this.newChannel = data[0];
          console.log("channel", this.newChannel);
        }
      });
    });

   

    this.currentUser = this.authService.getCurrentuser();
    this.currentUser = JSON.parse(this.currentUser);

    this.socketService.getchathistory(this.channel).subscribe((chatHistory: any[]) => {
      // Handle the chat history data here
      this.messagesin = chatHistory;
      console.log(this.messagesin);
      this.scrollToBottom();
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

      this.scrollToBottom();
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

  scrollToBottom(): void {
    try {
      // Use a setTimeout to allow the DOM to update before scrolling
      setTimeout(() => {
        this.scrollable.nativeElement.scrollTop = this.scrollable.nativeElement.scrollHeight;
      });
    } catch (err) {
      console.error(err);
    }
  }
}