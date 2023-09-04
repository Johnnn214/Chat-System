import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Group } from '../models/group';
import { GroupsService } from '../services/groups.service';
import { Channel } from '../models/channel';

@Component({
  selector: 'app-grouplist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.css']
})
export class GrouplistComponent {
  constructor(private groupsservice: GroupsService) { }
  newgrouplist:Array<Group> = []; 
  show:boolean = false;
  channel?: Array<Channel>;

  isadmin: boolean= false;
  user:any = sessionStorage.getItem('currentUser');
  admin:string = "super"
  user1 = JSON.parse(this.user);
  role!: Array<string>;
  ngOnInit(){
    this.groupsservice.getAllGroups().subscribe( newgrouplist => {
      this.newgrouplist=  newgrouplist;
      //console.log("group",this.newgrouplist);
    })


    if (this.user1 != null){
      this.role = this.user1.roles;
      if (this.role.includes(this.admin)){
      this.isadmin = true;
      }else{
        this.isadmin = false;
      }
      console.log("user ",this.user1);
      console.log("roles", this.role);
      console.log(this.isadmin);
    }
    else {
      console.log("role is empty")

    }

  }
 
  
  onSelect(group:Group){
    this.groupsservice.setcurrentgroup(group);
  }


  edit(event:any){
    this.show =true;
    console.log("show",this.show);
  }
  cancel(event:any){
    this.show =false;
    console.log("show",this.show);
  }

  remove(event:any){

  }
  creategroup(event:any){

  }
  addUser(event:any){

  }

}
