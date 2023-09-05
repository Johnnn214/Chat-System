import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Group } from '../models/group';
import { GroupsService } from '../services/groups.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grouplist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.css']
})
export class GrouplistComponent {
  constructor(private groupsservice: GroupsService) { }
  newgrouplist:Array<Group> = []; 
  currentgrouplist:Array<Group> = [];
  isadmin: boolean= false;
  user:any = sessionStorage.getItem('currentUser');
  super:string= "super";
  admin:string = "group";
  user1 = JSON.parse(this.user);
  role!: Array<string>;
  newgroupname: string = '';
  newgroup = new Group('','',['channel1']);
  ngOnInit(){
    this.groupsservice.getAllGroups().subscribe( newgrouplist => {
      if (this.user1.roles.includes(this.super)){
      this.groupsservice.setCurrentgrouplist(newgrouplist);
      }else {
       newgrouplist.forEach((group: Group) => {
        if (group.admin.includes(this.user1.username)||this.user1.group.includes(group.name)){
          this.newgrouplist.push(group);
          this.groupsservice.setCurrentgrouplist(this.newgrouplist);  
        }
      })}  
    })
      this.currentgrouplist = JSON.parse(this.groupsservice.getCurrentgrouplist() || '{}');
      console.log("group", this.currentgrouplist);

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

  creategroup(newgroup:Group){
    newgroup = Object.assign({}, newgroup);
    newgroup.name = this.newgroupname;
    newgroup.admin.push(this.user1.username);
    this.currentgrouplist.push(newgroup);
    this.groupsservice.setCurrentgrouplist(this.currentgrouplist);
    this.newgroupname = "";
  }

  remove(event:any){
  }

  addUser(event:any){
  }

}
