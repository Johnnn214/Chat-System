import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Channel } from '../../../models/channel';
import { GroupsService } from '../../../services/groups.service';
import { Group } from '../../../models/group';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {
  group: any = <any>{};
  newchannel: Channel = new Channel();
  channels: any[] = [];
  groupId:string = "";
  constructor(private groupsservice: GroupsService) { }

  ngOnInit(){
    this.groupsservice.currentgroup$.subscribe({
      next: (data) => {
        this.group = data;
        console.log("current group",this.group);
        this.groupId = this.group._id;
        //console.log(this.groupId);
        this.loadChannels();
      }
    }); 
  }
  loadChannels() {
    if(!this.groupId){
      console.log("no group selected");
    }else{
      this.groupsservice.getChannelsForGroup(this.groupId).subscribe(
        {next: (data) => {
        this.channels = data;
        console.log(this.channels);
        }
      });
    }
  }
  addChannel() {
    // Implement logic to add a channel to the current group
    this.groupsservice.addChannelToGroup(this.group._id, this.newchannel).subscribe((result) => {
      // Handle the result (e.g., update the group object)
      this.group.channels.push(result);
      
    });
    this.loadChannels();
    this.newchannel.name = ''; // Clear the input field
  }

  removeChannel(channelId: string) {
    // Implement logic to remove a channel from the current group
    this.groupsservice.removeChannelFromGroup(this.group._id, channelId).subscribe((result) => {
      console.log('Response from API:', result);
    });
    this.loadChannels();
  }

  joinChannel(channelId: string) {
    // Implement logic to join a channel within the current group
    this.groupsservice.joinChannelInGroup(this.group._id, channelId).subscribe(() => {
      // Handle the result (e.g., update the user's channels)
      // You might want to update the user's channels or perform any necessary actions here
    });
  }
}