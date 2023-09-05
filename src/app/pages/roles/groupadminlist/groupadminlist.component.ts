import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-groupadminlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './groupadminlist.component.html',
  styleUrls: ['./groupadminlist.component.css']
})
export class GroupadminlistComponent {
  constructor(private usersService: UsersService) { }

  Userarray:Array<User> = []
  roles:string= "group";
  show:boolean = false;

  isadmin: boolean= false;
  user:any = localStorage.getItem('currentUser');
  admin:string = "super"
  user1 = JSON.parse(this.user);
  role!: Array<string>;
  

  ngOnInit(){
    this.usersService.getAllUsernames(this.roles).subscribe( Userarray => {
     // console.log(this.Userarray);
     this.usersService.setCurrentgroupadminlist(Userarray);  
     this.Userarray = JSON.parse(this.usersService.getCurrentgroupadminlist() || '{}');
     console.log("groupadmins", this.Userarray);

     
    if (this.user1 != null){
      this.role = this.user1.roles;
      if (this.role.includes(this.admin)){
      this.isadmin = true;
      }else{
        this.isadmin = false;
      }
      console.log("user ",this.user1);
      console.log("roles", this.role);
      console.log(this.isadmin);
    }
    else {
      console.log("role is empty")

    }

 
    })

  }
  promotetosuper(event:any){

  }

}
