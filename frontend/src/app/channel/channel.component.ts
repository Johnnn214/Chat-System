import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Channel } from '../models/channel';
import { GroupsService } from '../services/groups.service';
import { Group } from '../models/group';
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
  
  newchannel: Channel = new Channel('', '', '' );
  channels: any[] = [];
  groupId:string = "";

  issuperadmin: boolean= false;
  isadmin: boolean= false;
  currentuser:any = localStorage.getItem('currentUser');
  user = JSON.parse(this.currentuser);
  super:string= "super";
  admin:string = "group";
  isadminofgroup:boolean = false;
  errormsg:string= '';

  constructor(private groupsservice: GroupsService,
    private router: Router
    ) { }

  ngOnInit(){
    this.groupsservice.currentgroup$.subscribe({
      next: (data) => {
        this.group = data;
        this.groupId = this.group._id;
        console.log("admin", this.group);
        console.log("user", this.user);
        // checks for user is the admin and if it made the group.
        if (this.group && this.group.admins) {
          this.isadminofgroup = this.group.admins.includes(this.user._id);
          console.log(this.isadminofgroup)
        } else {
          this.isadminofgroup = false; 
        }
        this.loadChannels();
      }
    }); 
    // checking the user roles
    if (this.user != null && this.user.roles) {
      this.issuperadmin = this.user.roles.includes(this.super);
      this.isadmin = this.user.roles.includes(this.admin);
    } else {
      console.log("Roles are empty");
    }
  }

  // loading channels of group
  async loadChannels() {
    if(!this.groupId){
      console.log("no group selected");
    }else{
      this.groupsservice.getChannelsForGroup(this.groupId).subscribe(
        {next: (data) => {``
        this.channels = data;
        console.log("group",this.channels);
        }
      });
    }
  }

  // create channel
  async addChannel() {
    if(this.newchannel.name){
      this.groupsservice.addChannelToGroup(this.group._id, this.newchannel).subscribe( async (data) => {
        console.log('Response from API:', data);
        await this.loadChannels();
        this.newchannel.name = ''; 
        this.errormsg = ''
      });
    }else{
      this.errormsg = 'Name is Required';
    }
  }
  // deleting channel
  removeChannel(channelId: string) {
    this.groupsservice.removeChannelFromGroup(this.group._id, channelId).subscribe((result) => {
      console.log('Response from API:', result);
      this.loadChannels();
    });
  }
  //joining channel which take to the chat component
  joinChannel(channelId: string) {
    this.router.navigate(['/chat', channelId]);
  }
}