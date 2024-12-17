import { Component } from '@angular/core';
import { UserslistGroupViewComponent } from '../userslist-group-view/userslist-group-view.component';
import { ChannelComponent } from '../channel/channel.component';
import { GrouplistsuperComponent } from '../grouplistsuper/grouplistsuper.component';
import { UsersingroupComponent } from '../usersingroup/usersingroup.component';

@Component({
  selector: 'app-groupsuper',
  standalone: true,
  templateUrl: './groupsuper.component.html',
  styleUrls: ['./groupsuper.component.css'],
  imports: [UserslistGroupViewComponent,GrouplistsuperComponent, ChannelComponent, UsersingroupComponent]
})
export class GroupsuperComponent {

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


