import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private AuthService: AuthService, 
    private router: Router) { }

  email:string = "";
  password:string = "";
  errormsg: string ="";
  newuser:User = new User();
  loggedin:boolean = false;
  ngOnInit() {
    if (sessionStorage.getItem('currentUser')){
      this.loggedin = true;
    }else{
      this.loggedin = false;
    }
  }

  signin(event:any){
    console.log("at signin");
    event.preventDefault();
    this.AuthService.login(this.email,this.password).subscribe({
      next:
        (data)=>{
          if (data.valid == true){
            this.newuser = new User(data.username, data.email,data.id, data.password,
               data.roles, data.group, data.valid)
            this.AuthService.setCurrentuser(this.newuser);
            this.router.navigate(['/profile']);
          }else{
           
            this.errormsg = "There is a problem with the credentials";
          }
      
      error:
        this.errormsg = "There is a problem with the credentials";
      
    }
      
  })
  }

}

