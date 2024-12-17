import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvailablegroupComponent } from '../availablegroup/availablegroup.component';
import { ChannelComponent } from '../channel/channel.component';
import { UsersingroupComponent } from '../usersingroup/usersingroup.component';
import { UserslistGroupViewComponent } from '../userslist-group-view/userslist-group-view.component';
import { GrouplistusersComponent } from '../grouplistusers/grouplistusers.component';

@Component({
  selector: 'app-groupusers',
  templateUrl: './groupusers.component.html',
  styleUrls: ['./groupusers.component.css'],
  standalone: true,
  imports: [CommonModule, 
          UserslistGroupViewComponent, ChannelComponent,
          AvailablegroupComponent, GrouplistusersComponent,UsersingroupComponent]
})
export class GroupusersComponent {

}
