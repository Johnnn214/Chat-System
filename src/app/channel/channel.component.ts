import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Channel } from '../models/channel';
import { GroupsService } from '../services/groups.service';
import { Group } from '../models/group';
@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent {
  show:boolean = false;
  newchannel:Channel = new Channel();

  constructor(private groupsservice: GroupsService) { }

  group:Group = <Group>{};
  ngOnInit(): void {
    this.groupsservice.currentgroup$.subscribe({
      next: (data)=>{
       this.group = data;
     }
    })
    
}

  addchannel(event:any){
    this.show =true;
    console.log(this.show);
  }
  removechannel(event:any){
    this.show =false;
    console.log(this.show);
  }

}
