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
  newuser:User = new User();
  username:string ="a"
  Userarray:Array<User> = []
  roles:string= "group";

  ngOnInit(){
    this.usersService.getAllUsernames(this.roles).subscribe( Userarray => {
      this.Userarray= Userarray;
     // console.log(this.Userarray);
     
    })

  }

}
