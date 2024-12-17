import { Component } from '@angular/core';
import { Group } from '../models/group';
import { GroupsService } from '../services/groups.service';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grouplistsuper',
  standalone  : true,
  templateUrl: './grouplistsuper.component.html',
  styleUrls: ['./grouplistsuper.component.css'],
  imports: [CommonModule, FormsModule]
})
export class GrouplistsuperComponent {

    newgroupname: string = '';
    currentgrouplist: Group[] = [];
    adduser: string = '';
    group!:any;
    errormsg:string = '';
  
    issuperadmin: boolean= false;
    isadmin: boolean= false;
    currentuser:any = localStorage.getItem('currentUser');
    user = JSON.parse(this.currentuser);
    super:string= "super";
    success:string = '';
    erroruser:string= '';
  
    groupButtonVisibility: { [key: string]: boolean } = {};
    isadminforgroup: { [key: string]: boolean } = {};
  
    constructor(
      private groupsService: GroupsService,
      private usersService: UsersService
    ) {}
  
    ngOnInit() {
      // Check if currentUser is defined before accessing its properties
      console.log("current User",this.user);
  
      this.loadgroup();
      // check the role of user
      if (this.user != null && this.user.roles) {
        this.issuperadmin = this.user.roles.includes(this.super);
      } else {
        console.log("Roles are empty");
      }
  
      this.currentgrouplist.forEach(group => {
        this.groupButtonVisibility[group._id] = false;
      });
  
    }
    //loading group based on role of user
    async loadgroup(){
      // super 
      if (this.user) {
          this.groupsService.getAllGroups().subscribe((groups) => {
            this.currentgrouplist = groups;
            console.log("allgroups",this.currentgrouplist);
          });
      }
    }
   // selecting group
    onSelect(group: Group) {
      this.group = this.groupsService.setcurrentgroup(group);
    }
  
    async createGroup() {
      // Implement your logic to create a group
      if(this.newgroupname){
        const newGroup: Group = {
          name: this.newgroupname,
          admins: [this.user?._id],
          _id: undefined
        };
        this.groupsService.createGroup(newGroup).subscribe(async (createdGroup) => {
          await this.loadgroup();
          this.errormsg = "";
        });
      }else{
        this.errormsg = " required name";
      }
      this.newgroupname = "";
    }

  // removing group
    remove(group: any) {
      this.groupsService.deleteGroup(group._id).subscribe((data) => {
          console.log("Group deleted successfully.");
          this.currentgrouplist = this.currentgrouplist.filter((g) => g._id !== group._id);
      });
    }
   // adding user to group
    addUser(group: any) {
      if (this.adduser) {
        this.usersService.addUserInGroup(group._id, this.adduser).subscribe(
          (response) => {
            this.adduser = "";
            this.erroruser = "";
            this.success = "Added User"
          },
          (error) => {
            this.erroruser = "User is already in the Group"
            this.success = "";}
        );
      } else {
        this.erroruser = "Name is Required";
        this.success = "";
      }
    }
    // toggles the edit button
    toggleButtonVisibility(groupId: string, buttonType: string) {
      this.groupButtonVisibility[groupId] = !this.groupButtonVisibility[groupId];
    }  
  }

