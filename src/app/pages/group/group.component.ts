import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrouplistComponent } from "./grouplist/grouplist.component";
import { User } from 'src/app/models/user';
import { ChannelComponent } from 'src/app/pages/group/channel/channel.component';
import { GroupuserComponent } from 'src/app/pages/group/groupuser/groupuser.component';
import { UserslistGroupViewComponent } from 'src/app/pages/group/userslist-group-view/userslist-group-view.component';
import { GrouplistUserViewComponent } from 'src/app/pages/group/grouplist-user-view/grouplist-user-view.component';

@Component({
    selector: 'app-group',
    standalone: true,
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css'],
    imports: [CommonModule, GrouplistComponent,
      UserslistGroupViewComponent,ChannelComponent, GroupuserComponent, GrouplistUserViewComponent]
})
export class GroupComponent {
  issuperadmin:boolean = false;
  isadmin:boolean = false;
  user:any = localStorage.getItem('currentUser');
  admin:string = "group"
  superadmin:string = "super"
  user1 = JSON.parse(this.user);
  role!: Array<string>;

  ngOnInit() {
    if (this.user1 != null){
      this.role = this.user1.roles;
      if (this.role.includes(this.admin)){
      this.isadmin = true;
      }else{
        this.isadmin = false;
      }
      if (this.role.includes(this.superadmin)){
        this.issuperadmin = true;
      }else{
        this.issuperadmin = false;
      }

      // console.log("user ",this.user1);
      // console.log("roles", this.role);
      // console.log(this.isadmin);
    }
    else {
      console.log("role is empty")
    }

  }


}
