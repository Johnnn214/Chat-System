import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-userslist-group-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './userslist-group-view.component.html',
  styleUrls: ['./userslist-group-view.component.css']
})
export class UserslistGroupViewComponent {
  users: any[] = [];
  errormsg = "";
  promotedsuper = '';
  promotedadmin = '';
  newUser: User = {
    username: '', 
    email: '',
    password: '123',
    roles: ["user"],
    group: [],
    valid: false,
    avatar:''
  };
  issuperadmin: boolean= false;
  isadmin: boolean= false;
  currentuser:any = localStorage.getItem('currentUser');
  user = JSON.parse(this.currentuser);
  super:string= "super";
  admin:string = "admin";
  showCreateUserForm: boolean = false;

  userButtonVisibility: { [key: string]: boolean } = {};
  isuseranadmin: { [key: string]: boolean } = {};
  isuserasuper: { [key: string]: boolean } = {};
  
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.loadUsers();
    // checks role if user
    if (this.user != null && this.user.roles) {
      this.issuperadmin = this.user.roles.includes(this.super);
      this.isadmin = this.user.roles.includes(this.admin);
    } else {
      console.log("Roles are empty");
    }

    this.users.forEach(user => {
      this.userButtonVisibility[user._id] = false;
    });
  }
  // load users
  loadUsers(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.users = users;
      this.users.forEach(user => {
        if(user.roles.includes(this.super)){
        this.isuserasuper[user._id] = true;
        }else{
          this.isuserasuper[user._id] = false
        }
      });
      this.users.forEach(user => {
        if(user.roles.includes(this.admin)){
        this.isuseranadmin[user._id] = true;
        }else{
          this.isuseranadmin[user._id] = false
        }
      });
    });
  }
  // creates user
  createUser(): void {
    if (this.newUser.username && this.newUser.email) {
      this.userService.createUser(this.newUser).subscribe(() => {
        this.loadUsers();
        this.errormsg = "";
      });
    }else{
      this.errormsg = "add username and email"
    }
    this.newUser.username = "";
    this.newUser.email = "";
  }
  // deleting user
  deleteUser(userId: string): void {
    this.userService.removeUser(userId).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== userId);
      this.loadUsers();
    });
  }
  // promote user to super
  promotetosuper(userId: string){
    this.userService.promotetosuper(userId).subscribe(() =>{
    this.loadUsers();
    });
    
  }
  // promote user to group admin
  promotetogroupadmin(userId: string){
    this.userService.promotetogroupadmin(userId).subscribe(() =>{
    this.loadUsers();
    });
    
  }
  // toggle create form
  toggleCreateUserForm() {
    this.showCreateUserForm = !this.showCreateUserForm;
  }
  // toggles edit button
  toggleButtonVisibility(userId: string, buttonType: string) {
    this.userButtonVisibility[userId] = !this.userButtonVisibility[userId];
  }
}