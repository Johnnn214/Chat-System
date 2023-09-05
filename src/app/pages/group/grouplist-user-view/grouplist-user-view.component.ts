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
  newgrouplist:Array<Group> = []; 
  currentgrouplist:Array<Group> = [];
  show:boolean = false;
  channel?: Array<Channel>;
  newgroup:Group = new Group();
  isadmin: boolean= false;
  user:any = localStorage.getItem('currentUser');
  super:string= "super";
  admin:string = "group";
  user1 = JSON.parse(this.user);
  role!: Array<string>;

  ngOnInit(){
    this.groupsservice.getAllGroups().subscribe(newgrouplist => {
      newgrouplist.forEach((group: Group) => {
        if (!this.user1.group.includes(group.name) && !group.admin.includes(this.user1.name)){
          this.newgrouplist.push(group);
          this.groupsservice.setAvailablegrouplist(this.newgrouplist);  
        }
      })
    })
    this.currentgrouplist = JSON.parse(this.groupsservice.getAvailablegrouplist() || '{}');
    console.log("users", this.currentgrouplist);
  }

  apply(event:any){
  }

}
