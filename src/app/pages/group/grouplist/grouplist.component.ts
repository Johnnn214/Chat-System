import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Group } from '../../../models/group';
import { GroupsService } from '../../../services/groups.service';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-grouplist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.css']
})
export class GrouplistComponent implements OnInit {
  newgroupname: string = '';
  currentgrouplist: Group[] = [];
  adduser: string = '';
  currentUser!: any;
  group!:any;

  issuperadmin: boolean= false;
  isadmin: boolean= false;
  currentuser:any = localStorage.getItem('currentUser');
  user = JSON.parse(this.currentuser);
  super:string= "super";
  admin:string = "group";

  constructor(
    private groupsService: GroupsService,
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  loadgroup(){
    if (this.currentUser) {
      if (this.currentUser.roles && this.currentUser.roles.includes('super')) {
        // Fetch super groups
        this.groupsService.getAllGroups().subscribe((groups) => {
          this.currentgrouplist = groups;
          console.log("allgroups",this.currentgrouplist);
        });
      } else if (this.currentUser.roles && this.currentUser.roles.includes('group')) {
        this.groupsService.getUserGroups(this.currentUser.id).subscribe((userGroups) => {
          this.groupsService.getAdminGroups(this.currentUser.id).subscribe((adminGroups) => {
            const allGroups = [...userGroups, ...adminGroups];
            const uniqueGroups = Array.from(new Set(allGroups.map(group => group._id)))
              .map(groupID => allGroups.find(group => group._id === groupID))
              .filter(group => group !== undefined) as Group[];
            this.currentgrouplist = uniqueGroups;
            console.log("groups where admin is a member and created groups", this.currentgrouplist);
          });
        });
      }else if (this.currentUser.roles && this.currentUser.roles.includes('user')) {
        this.groupsService.getUserGroups(this.currentUser.id).subscribe((groups) => {
          this.currentgrouplist = groups;
          console.log("usergroups", this.currentgrouplist);
        });
      }
    }
  }

  ngOnInit() {
    // Check if currentUser is defined before accessing its properties
    this.currentUser = this.authService.getCurrentuser();
    this.currentUser = JSON.parse(this.currentUser);
    console.log("current User",this.currentUser);
    this.loadgroup();

    if (this.user != null && this.user.roles) {
      this.issuperadmin = this.user.roles.includes(this.super);
      this.isadmin = this.user.roles.includes(this.admin);
    } else {
      console.log("Roles are empty");
    }
  }
 
  onSelect(group: Group) {
    this.group = this.groupsService.setcurrentgroup(group);
  }

  createGroup() {
    // Implement your logic to create a group
    const newGroup: Group = {
      name: this.newgroupname,
      admins: [this.currentUser?.id],
      _id: undefined
    };
    this.groupsService.createGroup(newGroup).subscribe((createdGroup) => {
      this.currentgrouplist.push(createdGroup);
    });
    this.loadgroup();
    this.newgroupname = ""; // Clear the input field
  }

  remove(group: any) {
    this.groupsService.deleteGroup(group._id).subscribe(() => {
    });
    this.loadgroup();
    this.onSelect(group);
  }

  addUser(group: any) {
    const usernameToAdd = this.adduser; // Get the username to add from your input field
    // Check if the username is empty or null (you can add more validation)
    if (!usernameToAdd) {
      // Handle the case where the username is not provided
      return;
    }
    // Call the service method to add the user to the group
    this.usersService.addUserInGroup(group._id, usernameToAdd).subscribe(
      () => {});
      this.adduser="";
  }

}