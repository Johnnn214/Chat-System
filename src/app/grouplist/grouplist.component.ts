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
  show:boolean = false;

  ngOnInit(){
    this.groupsservice.getAllGroups().subscribe( newgrouplist => {
      this.newgrouplist= newgrouplist;
      console.log(this.newgrouplist);
    })
  }
  edit(event:any){
    this.show =true;
    console.log(this.show);
  }
  cancel(event:any){
    this.show =false;
    console.log(this.show);
  }

  remove(event:any){

  }
  creategroup(event:any){

  }

}
