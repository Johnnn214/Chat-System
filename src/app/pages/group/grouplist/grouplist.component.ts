import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Group } from '../../../models/group';
import { GroupsService } from '../../../services/groups.service';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-grouplist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.css']
})
export class GrouplistComponent {
 
  constructor(private groupsservice: GroupsService,private usersService: UsersService) { }
  newgrouplist:Array<Group> = []; 
  currentgrouplist:Array<Group> = [];
  isadmin: boolean= false;
  user:any = localStorage.getItem('currentUser');
  super:string= "super";
  admin:string = "group";
  user1 = JSON.parse(this.user);
  role!: Array<string>;
  newgroupname: string = '';
  newgroup = new Group('','',['channel1']);
  adduser:string = "";
  userarray!:Array<User>;
  groupuserarray!:Array<User>;
  roles:string = "user";
  currentuserarray!:Array<User>;
  ngOnInit(){
    this.groupsservice.getAllGroups().subscribe( newgrouplist => {
      this.groupsservice.setallgroup(newgrouplist);
      if (this.user1.roles.includes(this.super)){ 
        if (!sessionStorage.getItem('superGrouplist')){
        this.groupsservice.setsupergrouplist(newgrouplist);
        }
        this.currentgrouplist = JSON.parse(this.groupsservice.getsupergrouplist() || '{}');
        console.log("super", this.currentgrouplist);
      }else {
       newgrouplist.forEach((group: Group) => {
        if (group.admin.includes(this.user1.username)||this.user1.group.includes(group.name)){
          this.newgrouplist.push(group);
          console.log(this.newgrouplist);
        }})
        if (!sessionStorage.getItem('adminGrouplist')){
          this.groupsservice.setadmingrouplist(this.newgrouplist); 
          } 
          this.currentgrouplist = JSON.parse(this.groupsservice.getadmingrouplist() || '{}');
          console.log("admin", this.currentgrouplist); 
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

  onSelect(group:Group){
    this.groupsservice.setcurrentgroup(group);
  }
  creategroup(newgroup:Group){
    newgroup = Object.assign({}, newgroup);
    newgroup.name = this.newgroupname;
    if(!newgroup.admin.includes(this.user1.username)){
      newgroup.admin.push(this.user1.username);
    }
    this.currentgrouplist.push(newgroup);
    this.groupsservice.setadmingrouplist(this.currentgrouplist);
    this.groupsservice.setsupergrouplist(this.currentgrouplist);
    this.newgroupname = "";
  }

  remove(groupname:string){
    this.currentgrouplist = this.currentgrouplist.filter((obj) => obj.name !== groupname);
    console.log(this.currentgrouplist);
    this.groupsservice.setadmingrouplist(this.currentgrouplist);
    this.groupsservice.setsupergrouplist(this.currentgrouplist);
      
  }

  addUser(username:string, groupname:string){
    this.userarray = JSON.parse(this.usersService.getCurrentuserlist() || '{}');
    this.userarray.forEach(user => {
      if (user.username == username){
        user.group.push(groupname);
        console.log(this.userarray);
        this.usersService.setCurrentuserlist(this.userarray);
      }
      })
    this.adduser = "";
  }

}
