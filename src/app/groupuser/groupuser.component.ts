import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-groupuser',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './groupuser.component.html',
  styleUrls: ['./groupuser.component.css']
})
export class GroupuserComponent {
  constructor(private usersService: UsersService) { }
  newuser:User = new User();
  Userarray:Array<User> = []
  group:string= "group1";
  ngOnInit(){
    this.usersService.getUserinGroup(this.group).subscribe( Userarray => {
      this.Userarray= Userarray;
     // console.log(this.Userarray);

 
    })}
  

}
