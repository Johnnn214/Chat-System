import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit  {
  newUser: User = {
    avatar: '',
    username: '', 
    email: '',
    id: '',
    password: '',
    roles: ["user"],
    group: [],
    valid: false
  };
  constructor(private userService: UsersService, private router: Router) {}
  ngOnInit(): void {}

  // signup

  signup(): void {
    if (this.newUser.username && this.newUser.email) {
      this.userService.createUser(this.newUser).subscribe(() => {
      });
    }
    this.router.navigate(['']);
  }
}
