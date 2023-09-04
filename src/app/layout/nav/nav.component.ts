import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
    
  constructor(private authServices: AuthService) { }

  isadmin:boolean = false;
  issuperadmin: boolean= false;
  user:any = sessionStorage.getItem('currentUser');
  superadmin:string = "super"
  user1 = JSON.parse(this.user);
  role!: Array<string>;
  loggedin:boolean = false;

  ngOnInit() {
    if (sessionStorage.getItem('currentUser')){
      this.loggedin = true;
    }else{
      this.loggedin = false;
    }
    if (this.user1 != null){
      this.role = this.user1.roles;
      if (this.role.includes(this.superadmin)){
      this.issuperadmin = true;
      }else{
        this.issuperadmin = false;
      }
      console.log("user ",this.user1);
      console.log("roles", this.role);
      console.log(this.issuperadmin);
    }
    else {
      console.log("role is empty")

    }

  }

  logout(event:any){
    this.authServices.logout(event);
    }

}
