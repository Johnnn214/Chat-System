import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent {
  
  constructor(private usersService: UsersService) { }

  currentuserarray:Array<User> = [];
  roles:string= "user";
  isadmin: boolean= false;
  user:any = sessionStorage.getItem('currentUser');
  admin:string = "super"
  user1 = JSON.parse(this.user);
  role!: Array<string>;
  
  ngOnInit(){
    this.usersService.getAllUsernames(this.roles).subscribe( Userarray => {
      this.usersService.setCurrentuserlist(Userarray);  
      this.currentuserarray = JSON.parse(this.usersService.getCurrentuserlist() || '{}');
      console.log("users", this.currentuserarray);

     // console.log(this.Userarray);

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
    })

  }
  promotetosuper(event:any){

  }
  promotetogroup(event:any){
 
  }
  adduser(event:any){

  }


}
