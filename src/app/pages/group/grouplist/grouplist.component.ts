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

  constructor(
    private groupsService: GroupsService,
    private authService: AuthService
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
        // Fetch admin groups based on the current user's ID
        this.groupsService.getAdminGroups(this.currentUser.username).subscribe((groups) => {
          this.currentgrouplist = groups;
          console.log("admingroup",this.currentgrouplist);
        });
      }
    }
  }
  ngOnInit() {
    // Check if currentUser is defined before accessing its properties
    this.currentUser = this.authService.getCurrentuser();
    this.currentUser = JSON.parse(this.currentUser);
    this.loadgroup();

  }
  group!:any;
  onSelect(group: Group) {
    this.group = this.groupsService.setcurrentgroup(group);
  }

  createGroup() {
    // Implement your logic to create a group
    const newGroup: Group = {
      name: this.newgroupname,
      admins: [this.currentUser?.username],
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
  }

  addUser() {
    // Implement your logic to add a user to a group
  }
}