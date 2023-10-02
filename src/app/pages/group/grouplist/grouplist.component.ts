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
  group!:any;
  errormsg:string = '';

  issuperadmin: boolean= false;
  isadmin: boolean= false;
  currentuser:any = localStorage.getItem('currentUser');
  user = JSON.parse(this.currentuser);
  super:string= "super";
  admin:string = "group";
  success:string = '';
  erroruser:string= '';

  groupButtonVisibility: { [key: string]: boolean } = {};
  isadminforgroup: { [key: string]: boolean } = {};

  constructor(
    private groupsService: GroupsService,
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  ngOnInit() {
    // Check if currentUser is defined before accessing its properties
    console.log("current User",this.user);
    this.loadgroup();

    if (this.user != null && this.user.roles) {
      this.issuperadmin = this.user.roles.includes(this.super);
      this.isadmin = this.user.roles.includes(this.admin);
    } else {
      console.log("Roles are empty");
    }

    this.currentgrouplist.forEach(group => {
      this.groupButtonVisibility[group._id] = false;
    });

  }

  loadgroup(){
    if (this.user) {
      if (this.user.roles && this.user.roles.includes('super')) {
        this.groupsService.getAllGroups().subscribe((groups) => {
          this.currentgrouplist = groups;
          console.log("allgroups",this.currentgrouplist);
        });
      } else if (this.user.roles && this.user.roles.includes('group')) {
        this.groupsService.getUserGroups(this.user.id).subscribe((userGroups) => {
          this.groupsService.getAdminGroups(this.user.id).subscribe((adminGroups) => {
            const allGroups = [...userGroups, ...adminGroups];
            const uniqueGroups = Array.from(new Set(allGroups.map(group => group._id)))
              .map(groupID => allGroups.find(group => group._id === groupID))
              .filter(group => group !== undefined) as Group[];
            this.currentgrouplist = uniqueGroups;
            console.log("groups where admin is a member and created groups", this.currentgrouplist);

            this.currentgrouplist.forEach(group => {
              if(group.admins.includes(this.user.id)){
              this.isadminforgroup[group._id] = true;
              }else{
                this.isadminforgroup[group._id] = false
              }
              console.log(this.isadminforgroup);
            });
          });
        });
      }else if (this.user.roles && this.user.roles.includes('user')) {
        this.groupsService.getUserGroups(this.user.id).subscribe((groups) => {
          this.currentgrouplist = groups;
          console.log("usergroups", this.currentgrouplist);
        });
      }
    }
  }
 
  onSelect(group: Group) {
    this.group = this.groupsService.setcurrentgroup(group);
  }

  createGroup() {
    // Implement your logic to create a group
    if(this.newgroupname){
      const newGroup: Group = {
        name: this.newgroupname,
        admins: [this.user?.id],
        _id: undefined
      };
      this.groupsService.createGroup(newGroup).subscribe((createdGroup) => {
        this.currentgrouplist.push(createdGroup);
      });
      this.errormsg = "";
    }else{
      this.errormsg = " require name";
    }
    this.loadgroup();
    this.newgroupname = "";
  }

  remove(group: any) {
    this.groupsService.deleteGroup(group._id).subscribe((data) => {
        console.log("Group deleted successfully.");
        this.currentgrouplist = this.currentgrouplist.filter((g) => g._id !== group._id);
    });
  }
 
  addUser(group: any) {
    if (this.adduser) {
      this.usersService.addUserInGroup(group._id, this.adduser).subscribe(
        (response) => {
          this.adduser = "";
          this.erroruser = "";
          this.success = "Added User"
        },
        (error) => {this.erroruser = "User is already in the Group";}
      );
    } else {
      this.erroruser = "Name is Required";
    }
  }

  toggleButtonVisibility(groupId: string, buttonType: string) {
    this.groupButtonVisibility[groupId] = !this.groupButtonVisibility[groupId];
  }


}