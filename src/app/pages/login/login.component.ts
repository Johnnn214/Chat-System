import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, 
    private router: Router) { }

  email:string = "";
  password:string = "";
  errormsg: string ="";
  newuser:User = new User();
  loggedin:boolean = false;
  ngOnInit() {
    this.authService.isLoggedin().subscribe((loggedIn) => {
      this.loggedin = loggedIn;
    });
  }

  signin(event:any){
    console.log("at signin");
    event.preventDefault();
    this.authService.login(this.email,this.password).subscribe({
      next:
        (data)=>{
          console.log("data",data);
          if (data.valid == true){
            this.newuser = new User(data.username, data.email, data.id, data.avatar, data.password,
               data.roles, data.group, data.valid);
            console.log("user",this.newuser);
            this.authService.setCurrentuser(this.newuser);
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

