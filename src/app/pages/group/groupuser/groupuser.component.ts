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
  constructor(
    private usersService: UsersService, 
    private groupsservice: GroupsService
  ) { }

  newgroupname: string = '';
  adduser: string = '';
  currentgrouplist: Group[] = [];
  user: User | null = null;


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (this.user) {
      // Fetch and populate the current group list based on the user's role
      if (this.user.roles.includes('super')) {
        this.groupsservice.getAllGroups().subscribe((groups) => {
          this.currentgrouplist = groups;
        });
      } else {
        this.groupsservice.getAdminGroups(this.user.username).subscribe((groups) => {
          this.currentgrouplist = groups;
        });
      }
    }
  }
  onSelect(group: Group) {
    // Handle selecting a group
  }
  creategroup() {

  }

  removeuser(){

  }
  addUser(){

  }

  

}
