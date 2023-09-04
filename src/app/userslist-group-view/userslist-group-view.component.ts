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
  Userarray:Array<User> = []
  roles:string= "user";  

  ngOnInit(){
    this.usersService.getAllUsernames(this.roles).subscribe( Userarray => {
      this.Userarray= Userarray;
     // console.log(this.Userarray);
    })

  }
}
