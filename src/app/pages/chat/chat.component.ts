import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { SocketsService } from 'src/app/services/sockets.service';
import { Msg } from 'src/app/models/msg';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Channel } from 'src/app/models/channel';
import { ImageuploadService } from 'src/app/services/imageupload.service';

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
  join:string = "Just joined the channel";
  left:string = "Just left the channel";
  selectedfile:any = null;
  uploadedimage:string = "";

  constructor(
    private socketService: SocketsService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private imgService: ImageuploadService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentuser();
    this.currentUser = JSON.parse(this.currentUser);
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

    this.socketService.getchathistory(this.channel).subscribe((chatHistory: any[]) => {
      // Handle the chat history data here
      this.messagesin = chatHistory;
      console.log(this.messagesin);
      this.scrollToBottom();
    });
    
  }

  private initIoConnection() {
    this.socketService.initSocket();
    this.socketService.joinChannel(this.channel, this.currentUser, this.join);
    this.socketService.getNewMessage().subscribe((data: any) => {
      console.log(data);
      const newMsg: Msg = {
        message: data.message,
        timestamp: new Date(),
        avatar: data.user.avatar,
        username: data.user.username,
        image: data.image,
      };
      console.log("messagereceived", newMsg);
      this.messagesin.push(newMsg);

      this.scrollToBottom();
    });
  }

  send() {
    console.log('Sending message:', this.messageout); // Add this line for debugging
    if(this.selectedfile || this.messageout ){
      if(this.selectedfile){
      const fd = new FormData();
      fd.append('image', this.selectedfile, this.selectedfile.name);
      this.imgService.imgupload(fd).subscribe({
        next: (res) => {  
          console.log(this.messageout);
          this.uploadedimage = res.data.filename; 
          this.socketService.sendMessage(this.channel, this.messageout, this.currentUser, this.uploadedimage);
          this.messageout = '';
          this.uploadedimage = '';
        }
      });
      }else{
        this.socketService.sendMessage(this.channel, this.messageout, this.currentUser, this.uploadedimage);
        this.messageout = '';
      }
    } else{
      console.log('No image or message');
    }
  }

  leave(){
    this.socketService.leaveChannel(this.channel, this.currentUser, this.left);
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

  onFileSelected(event:any){
    this.selectedfile = event.target.files[0];
  }

}