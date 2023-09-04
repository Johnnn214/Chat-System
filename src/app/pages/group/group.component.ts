import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserlistComponent } from 'src/app/userlist/userlist.component';
import { GrouplistComponent } from "../../grouplist/grouplist.component";
import { User } from 'src/app/models/user';
import { ChannelComponent } from 'src/app/channel/channel.component';
import { GroupuserComponent } from 'src/app/groupuser/groupuser.component';
import { UserslistGroupViewComponent } from 'src/app/userslist-group-view/userslist-group-view.component';

@Component({
    selector: 'app-group',
    standalone: true,
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css'],
    imports: [CommonModule, UserlistComponent, GrouplistComponent,
      UserslistGroupViewComponent,ChannelComponent, GroupuserComponent]
})
export class GroupComponent {

  isadmin:boolean = false;
  user:any = sessionStorage.getItem('currentUser');
  admin:string = "group"
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
      // console.log("user ",this.user1);
      // console.log("roles", this.role);
      // console.log(this.isadmin);
    }
    else {
      console.log("role is empty")
    }

  }


}
