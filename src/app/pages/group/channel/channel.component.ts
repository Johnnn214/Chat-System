import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Channel } from '../../../models/channel';
import { GroupsService } from '../../../services/groups.service';
import { Group } from '../../../models/group';
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

  isadmin: boolean= false;
  user:any = sessionStorage.getItem('currentUser');
  admin:string = "group"
  user1 = JSON.parse(this.user);
  role!: Array<string>;
  
  ngOnInit(): void {
    this.groupsservice.currentgroup$.subscribe({
      next: (data)=>{
       this.group = data;
     }
    })

    if (this.user1 != null){
      this.role = this.user1.roles;
      if (this.role.includes(this.admin)){
      this.isadmin = true;
      }else{
        this.isadmin = false;
      }
      // console.log("user ",this.user1);
      // console.log("roles", this.role);
      // console.log(this.isadmin);
    }
    else {
      console.log("role is empty")

    }



    
}

  addchannel(event:any){
  
  }
  removechannel(event:any){
 
  }
  joinchannel(event:any){

  }

}
