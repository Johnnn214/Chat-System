import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Msg } from 'src/app/models/msg';
import { SocketsService } from 'src/app/services/sockets.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit{
  messageout= signal("");
  messagesin = signal<Msg[]>([]);
  constructor(private socketService: SocketsService) { }



  ngOnInit(): void {
    this.initIoConnection();
    }

  private initIoConnection(){
    this.socketService.initSocket();

    this.socketService.getNewMessage()
    .subscribe((messages:any)=>{
        this.messagesin.set(messages);
          
    });
  }
    
  send(){
    if(this.messageout()){
      this.socketService.send(this.messageout());
      this.messageout.set("");
    }else{
      console.log('No Message');
    }
  }
}