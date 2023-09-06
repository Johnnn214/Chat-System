import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user';
import { UsersService } from '../../../services/users.service';
import { GroupsService } from '../../../services/groups.service';
import { Group } from '../../../models/group';

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
  userarray:Array<User> = []
  ngOnInit(){
    this.groupsservice.currentgroup$.subscribe({
      next: (data)=>{
       this.group = data;
       console.log("group",this.group);
     }
    })
  
  }
  showUsersingroup(event:any){
    this.userarray = [];
    this.Userarray = JSON.parse(this.usersService.getCurrentuserlist() || '{}');
    //console.log(this.Userarray);
    this.Userarray.forEach(user => {
      if (user.group.includes(this.group.name)){
        this.userarray.push(user);
        this.usersService.setCurrentgroupuserlist(this.userarray); 
        
      }})
    this.userarray = JSON.parse(this.usersService.getCurrentgroupuserlist() || '{}');
  }
  removeuser(username:string){
    this.userarray.forEach(user => {
      if(user.username == username){
       user.group = user.group.filter(group => group !== this.group.name);
       console.log(this.userarray);
       this.usersService.setCurrentgroupuserlist(this.userarray);
      }
    
    });
    //this.userarray = this.userarray.filter(user => user.username !== username);
   // console.log(this.userarray);
    //this.usersService.setCurrentgroupadminlist(this.userarray);

  }
  

}
