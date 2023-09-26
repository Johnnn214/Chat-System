import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Channel } from '../../../models/channel';
import { Group } from '../../../models/group';
import { GroupsService } from '../../../services/groups.service';

@Component({
  selector: 'app-grouplist-user-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grouplist-user-view.component.html',
  styleUrls: ['./grouplist-user-view.component.css']
})
export class GrouplistUserViewComponent {
  constructor(private groupsservice: GroupsService) { }
  currentgrouplist: Array<any> = ["a", "b"]
  ngOnInit(){

  }

  apply(event:any){
  }

}
