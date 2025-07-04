import { Component } from '@angular/core';
import { GroupsService } from '../services/groups.service';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usersingroup',
  templateUrl: './usersingroup.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./usersingroup.component.css']
})
export class UsersingroupComponent {
    group: any = <any>{};
    groupId:string = "";
    usersingroup:any[] = [];
    currentuser:any = localStorage.getItem('currentUser');
    user = JSON.parse(this.currentuser);
    super:string= "super";
    admin:string = "admin";
    isadminofgroup:boolean = false;
    issuperadmin: boolean= false;
    isadmin: boolean= false;
  
    constructor(
      private usersService: UsersService, 
      private groupsservice: GroupsService
    ) { }
  
    ngOnInit() {
      this.groupsservice.currentgroup$.subscribe({
        next: (data) => {
          this.group = data;
        //  console.log("current group",this.group);
          // checks if admin administers the selected group
          if (this.group && this.group.admins) {
            this.isadminofgroup = this.group.admins.includes(this.user._id);
            //console.log(this.isadminofgroup)
          } else {
            this.isadminofgroup = false; 
          }
          this.groupId = this.group._id;
          this.getUsersInGroup(this.groupId);
         // console.log("groupid",this.groupId);
        }
      }); 
      // checks if user role of user
      if (this.user != null && this.user.roles) {
        this.issuperadmin = this.user.roles.includes(this.super);
        this.isadmin = this.user.roles.includes(this.admin);
      } else {
        console.log("Roles are empty");
      }
    }
    // getting users in group
    getUsersInGroup(groupId: string): void {
      this.usersService.getUserInGroup(groupId).subscribe(users => {
        this.usersingroup = users;
        console.log("users",this.usersingroup);
      });
    }
    // remove users from group
    removeUserFromGroup(userId: string) {
      this.usersService.removeUserFromGroup(userId, this.groupId).subscribe(() => {
        this.getUsersInGroup(this.groupId);
      });
    }
  
}
