import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
    if (sessionStorage.getItem('currentUser')){
      this.loggedin = true;
    }else{
      this.loggedin = false;
    }
  }

  loggedin:boolean = false;
  email:string = "";
  pwd:string = "";

  signin(event:any){

  }

}
