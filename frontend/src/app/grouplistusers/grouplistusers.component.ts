import { Component } from '@angular/core';
import { Group } from '../models/group';
import { AuthService } from '../services/auth.service';
import { GroupsService } from '../services/groups.service';
import { UsersService } from '../services/users.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grouplistusers',
  templateUrl: './grouplistusers.component.html',
  styleUrls: ['./grouplistusers.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class GrouplistusersComponent {

    currentgrouplist: Group[] = [];
    group!:any;
    errormsg:string = '';
    currentuser:any = localStorage.getItem('currentUser');
    user = JSON.parse(this.currentuser);
    success:string = '';
    erroruser:string= '';

    constructor(
      private groupsService: GroupsService,
    ) {}
  
    ngOnInit() {
      // Check if currentUser is defined before accessing its properties
      console.log("current User",this.user);
  
      this.loadgroup();

    }
    //loading group based on role of user
    loadgroup(){

         if (this.user.roles && this.user.roles.includes('user')) {
          this.groupsService.getUserGroups(this.user._id).subscribe((groups) => {
            this.currentgrouplist = groups;
          //  console.log("usergroups", this.currentgrouplist);
          });
        }
    }
   // selecting group
    onSelect(group: Group) {
      this.group = this.groupsService.setcurrentgroup(group);
    }
  
}
