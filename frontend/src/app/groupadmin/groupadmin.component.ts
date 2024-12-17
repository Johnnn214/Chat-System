import { Component } from '@angular/core';
import { GrouplistadminComponent } from '../grouplistadmin/grouplistadmin.component';
import { CommonModule } from '@angular/common';
import { AvailablegroupComponent } from '../availablegroup/availablegroup.component';
import { ChannelComponent } from '../channel/channel.component';
import { UsersingroupComponent } from '../usersingroup/usersingroup.component';
import { UserslistGroupViewComponent } from '../userslist-group-view/userslist-group-view.component';


@Component({
  selector: 'app-groupadmin',
  standalone: true,
  templateUrl: './groupadmin.component.html',
  styleUrls: ['./groupadmin.component.css'],
  imports: [CommonModule, 
        UserslistGroupViewComponent, ChannelComponent,
        AvailablegroupComponent, GrouplistadminComponent,UsersingroupComponent]
})
export class GroupadminComponent {


  isadmin: boolean= false;
  currentuser:any = localStorage.getItem('currentUser');
  user = JSON.parse(this.currentuser);
  admin:string = "admin";
  
  ngOnInit(){
    if (this.user != null && this.user.roles) {
      this.isadmin = this.user.roles.includes(this.admin);
    } else {
      console.log("Roles are empty");
    }
  }

  
}
