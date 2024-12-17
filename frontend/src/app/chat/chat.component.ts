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
  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef<HTMLInputElement>;
  newmessage = '';
  messages: Msg[] = [];
  channel: string = '';
  currentUser!: any;
  newChannel:Channel = new Channel('', '', '');
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
      this.messages = chatHistory;
      console.log(this.messages);
      this.scrollToBottom();
    });
    
  }
// socket.io connection
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
        channelid: undefined
      };
      console.log("messagereceived", newMsg);
      this.messages.push(newMsg);

      this.scrollToBottom();
    });
  }
// sending message and images and saving it
  send() {
    console.log('Sending message:', this.newmessage); // Add this line for debugging
    if(this.selectedfile || this.newmessage ){
      if(this.selectedfile){
      const fd = new FormData();
      fd.append('image', this.selectedfile, this.selectedfile.name);
      this.imgService.imgupload(fd).subscribe({
        next: (res) => {  
          console.log(this.newmessage);
          this.uploadedimage = res.data.filename; 
          this.socketService.sendMessage(this.channel, this.newmessage, this.currentUser, this.uploadedimage);
          this.newmessage = '';
          this.uploadedimage = '';
          this.resetFileInput();
        }
      });
      }else{
        this.socketService.sendMessage(this.channel, this.newmessage, this.currentUser, this.uploadedimage);
        this.newmessage = '';
      }
    } else{
      console.log('No image or message');
    }
  }
// reseting input after sending
  private resetFileInput() {
    // Reset the file input value to an empty array
    this.fileInput.nativeElement.value = '';
    this.selectedfile = null;
  }
// leaving chat
  leave(){
    this.socketService.leaveChannel(this.channel, this.currentUser, this.left);
    this.router.navigate(['/group']);
  }
// when a new chat is added it scroll to the bottom of the box
  scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.scrollable.nativeElement.scrollTop = this.scrollable.nativeElement.scrollHeight;
      });
    } catch (err) {
      console.error(err);
    }
  }
// selected file
  onFileSelected(event:any){
    this.selectedfile = event.target.files[0];
  }

}