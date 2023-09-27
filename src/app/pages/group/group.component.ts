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
      UserslistGroupViewComponent, ChannelComponent, GroupuserComponent, GrouplistUserViewComponent]
})
export class GroupComponent {
 

}
