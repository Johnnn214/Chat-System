import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrouplistComponent } from "./grouplist/grouplist.component";
import { User } from 'src/app/models/user';
import { ChannelComponent } from 'src/app/pages/group/channel/channel.component';
import { GroupuserComponent } from 'src/app/pages/group/groupuser/groupuser.component';
import { UserslistGroupViewComponent } from 'src/app/pages/group/userslist-group-view/userslist-group-view.component';
import { AvailablegroupComponent } from 'src/app/pages/group/availablegroup/availablegroup.component';

@Component({
    selector: 'app-group',
    standalone: true,
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css'],
    imports: [CommonModule, GrouplistComponent,
      UserslistGroupViewComponent, ChannelComponent,
       GroupuserComponent,
      AvailablegroupComponent]
})
export class GroupComponent {

  issuperadmin: boolean= false;
  isadmin: boolean= false;
  currentuser:any = localStorage.getItem('currentUser');
  user = JSON.parse(this.currentuser);
  super:string= "super";
  admin:string = "group";
  
  ngOnInit(){
    if (this.user != null && this.user.roles) {
      this.issuperadmin = this.user.roles.includes(this.super);
      this.isadmin = this.user.roles.includes(this.admin);
    } else {
      console.log("Roles are empty");
    }
  }

}
