import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../../services/users.service';
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
  newuser:User = new User();
  username:string ="a"
  Userarray:Array<User> = []
  roles:string= "user";
  show:boolean = false;

  ngOnInit(){
    this.usersService.getAllUsernames(this.roles).subscribe( Userarray => {
      this.Userarray= Userarray;
      console.log(this.Userarray);
    })

  }
  adduser(event:any){

  }
  edit(event:any){
    this.show =true;
    console.log(this.show);
  }
  cancel(event:any){
    this.show =false;
    console.log(this.show);
  }

}
