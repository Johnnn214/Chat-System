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

  constructor(private groupsservice: GroupsService) { }

  ngOnInit(){
    this.groupsservice.currentgroup$.subscribe({
      next: (data) => {
        this.group = data;
        console.log("current group",this.group);
      }
    });
  }

  addChannel() {
    // Implement logic to add a channel to the current group
    this.groupsservice.addChannelToGroup(this.group._id, this.newchannel).subscribe((result) => {
      // Handle the result (e.g., update the group object)
      this.group.channels.push(result);
      this.newchannel.name = ''; // Clear the input field
    });

  }

  removeChannel(channelId: string) {
    // Implement logic to remove a channel from the current group
    this.groupsservice.removeChannelFromGroup(this.group._id, channelId).subscribe(() => {
      // Handle the result (e.g., remove the channel from the group object)
      this.group.channels = this.group.channels.filter((channel: { _id: string; }) => channel._id !== channelId);
    });
  }

  joinChannel(channelId: string) {
    // Implement logic to join a channel within the current group
    this.groupsservice.joinChannelInGroup(this.group._id, channelId).subscribe(() => {
      // Handle the result (e.g., update the user's channels)
      // You might want to update the user's channels or perform any necessary actions here
    });
  }
}