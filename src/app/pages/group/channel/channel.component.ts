import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Channel } from '../../../models/channel';
import { GroupsService } from '../../../services/groups.service';
import { Group } from '../../../models/group';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
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

  issuperadmin: boolean= false;
  isadmin: boolean= false;
  currentuser:any = localStorage.getItem('currentUser');
  user = JSON.parse(this.currentuser);
  super:string= "super";
  admin:string = "group";
  isadminofgroup:boolean = false;

  constructor(private groupsservice: GroupsService,
    private router: Router
    ) { }

  ngOnInit(){
    this.groupsservice.currentgroup$.subscribe({
      next: (data) => {
        this.group = data;
        this.groupId = this.group._id;
        console.log("group", this.group);
        console.log("user", this.user);
        if (this.group && this.group.admins) {
          this.isadminofgroup = this.group.admins.includes(this.user.id);
          console.log(this.isadminofgroup)
        } else {
          this.isadminofgroup = false; 
        }
        this.loadChannels();
      }
    }); 



    if (this.user != null && this.user.roles) {
      this.issuperadmin = this.user.roles.includes(this.super);
      this.isadmin = this.user.roles.includes(this.admin);
    } else {
      console.log("Roles are empty");
    }
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
      this.loadChannels();
    });
  }

  joinChannel(channelId: string) {
    this.router.navigate(['/chat', channelId]);
  }
}