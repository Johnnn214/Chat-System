import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/models/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-superlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './superlist.component.html',
  styleUrls: ['./superlist.component.css']
})
export class SuperlistComponent {
  constructor(private usersService: UsersService) { }
  newuser:User = new User();
  username:string ="a"
  Userarray:Array<User> = []
  roles:string= "super";

  ngOnInit(){
    this.usersService.getAllUsernames(this.roles).subscribe( Userarray => {
      this.usersService.setCurrentsuperlist(Userarray);  
      this.Userarray = JSON.parse(this.usersService.getCurrentsuperlist() || '{}');
      console.log("super", this.Userarray);
    })

  }

}