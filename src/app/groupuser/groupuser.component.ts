import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { GroupsService } from '../services/groups.service';
import { Group } from '../models/group';

@Component({
  selector: 'app-groupuser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './groupuser.component.html',
  styleUrls: ['./groupuser.component.css']
})
export class GroupuserComponent {
  constructor(private usersService: UsersService
    ,private groupsservice: GroupsService) { }
  newuser:User = new User();
  Userarray:Array<User> = []
  group1:string= "group1";
  group:Group = <Group>{};
  ngOnInit(){
    this.groupsservice.currentgroup$.subscribe({
      next: (data)=>{
       this.group = data;
       console.log("group",this.group);
     }
    })
  
  }
  showUsersingroup(event:any){
    this.usersService.getUserinGroup(this.group.name).subscribe( Userarray => {
      this.usersService.setCurrentgroupuserlist(Userarray);  
      this.Userarray = JSON.parse(this.usersService.getCurrentgroupuserlist() || '{}');
      console.log("users", this.Userarray);
    }) 

  }
  removeuser(event:any){

  }
  

}
