import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Group } from '../models/group';
import { GroupsService } from '../services/groups.service';

@Component({
  selector: 'app-grouplist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.css']
})
export class GrouplistComponent {
  constructor(private groupsservice: GroupsService) { }
  newgroup:string = "";
  newgrouplist:Array<Group> = []; 

  ngOnInit(){
    this.groupsservice.getAllGroups().subscribe( newgrouplist => {
      this.newgrouplist= newgrouplist;
      console.log(this.newgrouplist);
    })
  }
  edit(event:any){

  }
  cancel(event:any){

  }
  remove(event:any){

  }
  creategroup(event:any){
    
  }

}
