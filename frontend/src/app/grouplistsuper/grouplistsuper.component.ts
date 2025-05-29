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
    group!:any;
    errormsg:string = '';
  
    issuperadmin: boolean= false;
    isadmin: boolean= false;
    currentuser:any = localStorage.getItem('currentUser');
    user = JSON.parse(this.currentuser);
    super:string= "super";
  
    groupButtonVisibility: { [key: string]: boolean } = {};
    isadminforgroup: { [key: string]: boolean } = {};
    groupUserinput: { [key: string]: string } = {};
    groupErroruser: { [key: string]: string } = {};
    groupSuccess: { [key: string]: string } = {};
  
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

      this.currentgrouplist.forEach(group => {
        this.groupUserinput[group._id] = "";
      });

      this.currentgrouplist.forEach(group => {
        this.groupErroruser[group._id] = "";
      });
  
      this.currentgrouplist.forEach(group => {
        this.groupSuccess[group._id] = "";
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
      if (this.groupUserinput[group._id]) {
        this.usersService.addUserInGroup(group._id, this.groupUserinput[group._id]).subscribe(
          (response) => {
            this.groupUserinput[group._id] = "";
            this.groupErroruser[group._id] = "";
            this.groupSuccess[group._id] = "Added User"
          },
          (error) => {
            // console.log(error.error.error);
            this.groupUserinput[group._id] = "";
            this.groupErroruser[group._id] = error.error.error;
            this.groupSuccess[group._id] = "";}
        );
      } else {
        this.groupErroruser[group._id] = "Name is Required";
        this.groupSuccess[group._id] = "";
      }
    }

    // toggles the edit button
    toggleButtonVisibility(groupId: string, buttonType: string) {
      this.groupButtonVisibility[groupId] = !this.groupButtonVisibility[groupId];
    }  
  }

