import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Channel } from '../models/channel';
import { Group } from '../models/group';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-grouplist-user-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grouplist-user-view.component.html',
  styleUrls: ['./grouplist-user-view.component.css']
})
export class GrouplistUserViewComponent {
  constructor(private groupsservice: GroupsService) { }
  newgrouplist:Array<Group> = []; 
  show:boolean = false;
  channel?: Array<Channel>;
  newgroup:Group = new Group();
  isadmin: boolean= false;
  user:any = sessionStorage.getItem('currentUser');
  super:string= "super";
  admin:string = "group";
  user1 = JSON.parse(this.user);
  role!: Array<string>;

  ngOnInit(){
    this.groupsservice.getAllGroups().subscribe(newgrouplist => {
      newgrouplist.forEach((group: Group) => {
        if (!this.user1.group.includes(group.name) && !group.admin.includes(this.user1.name)){
          this.newgroup = group;
          this.newgrouplist.push(this.newgroup);
        }
      })
        console.log("group1",this.newgrouplist);
    })
  }

  apply(event:any){
  }

}
