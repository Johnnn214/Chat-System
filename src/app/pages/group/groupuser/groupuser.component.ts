import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';
import { GroupsService } from '../../../services/groups.service';
import { Group } from '../../../models/group';

@Component({
  selector: 'app-groupuser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './groupuser.component.html',
  styleUrls: ['./groupuser.component.css']
})
export class GroupuserComponent {
  group: any = <any>{};
  groupId:string = "";
  usersingroup:any[] = [];
  currentuser:any = localStorage.getItem('currentUser');
  user = JSON.parse(this.currentuser);
  super:string= "super";
  admin:string = "group";
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
        console.log("current group",this.group);
        if (this.group && this.group.admins) {
          this.isadminofgroup = this.group.admins.includes(this.user.id);
          console.log(this.isadminofgroup)
        } else {
          this.isadminofgroup = false; 
        }
        this.groupId = this.group._id;
        this.getUsersInGroup(this.groupId);
        console.log("groupid",this.groupId);
      }
    }); 

    if (this.user != null && this.user.roles) {
      this.issuperadmin = this.user.roles.includes(this.super);
      this.isadmin = this.user.roles.includes(this.admin);
    } else {
      console.log("Roles are empty");
    }
  }

  getUsersInGroup(groupId: string): void {
    this.usersService.getUserInGroup(groupId).subscribe(users => {
      this.usersingroup = users;
      console.log("users",this.usersingroup);
    });
  }

  removeUserFromGroup(userId: string) {
    this.usersService.removeUserFromGroup(userId, this.groupId).subscribe(() => {
      this.getUsersInGroup(this.groupId);
    });
  }

}
