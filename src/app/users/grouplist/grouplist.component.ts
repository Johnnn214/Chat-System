import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/models/user';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-grouplist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.css']
})
export class GrouplistComponent {
  constructor(private usersService: UsersService) { }
  newuser:User = new User();
  username:string ="a"
  Userarray:Array<User> = []
  roles:string= "group";

  ngOnInit(){
    this.usersService.getAllUsernames(this.roles).subscribe( Userarray => {
      this.Userarray= Userarray;
      console.log(this.Userarray);
    })

  }

}
