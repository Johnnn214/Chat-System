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
  newgroup:Group = new Group();
  isadmin: boolean= false;
  user:any = sessionStorage.getItem('currentUser');
  super:string= "super";
  admin:string = "group";
  user1 = JSON.parse(this.user);
  role!: Array<string>;
  ngOnInit(){
    this.groupsservice.getAllGroups().subscribe( newgrouplist => {
      if (this.user1.roles.includes(this.super)){
      this.newgrouplist =  newgrouplist;
      }else {
       newgrouplist.forEach((group: Group) => {
        if (group.admin.includes(this.user1.username)||this.user1.group.includes(group.name)){
          this.newgroup = group;
          this.newgrouplist.push(this.newgroup);
        }
      })}
        console.log("group1",this.newgrouplist);
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
 
  onSelect(group:Group){
    this.groupsservice.setcurrentgroup(group);
  }

  creategroup(event:any){
  }

  remove(event:any){
  }

  addUser(event:any){
  }

}
