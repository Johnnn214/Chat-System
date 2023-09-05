import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-userslist-group-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './userslist-group-view.component.html',
  styleUrls: ['./userslist-group-view.component.css']
})
export class UserslistGroupViewComponent {

  constructor(private usersService: UsersService) { }
  currentuserarray:Array<User> = []
  roles:string= "user";

  ngOnInit(){
    this.usersService.getAllUsernames(this.roles).subscribe( Userarray => {
      this.usersService.setCurrentuserlist(Userarray);  
      this.currentuserarray = JSON.parse(this.usersService.getCurrentuserlist() || '{}');
      console.log("users", this.currentuserarray);
    })

  }
}
