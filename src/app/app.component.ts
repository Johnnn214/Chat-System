import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Assignment_1';
  
  constructor(private authServices: AuthService) { }

  isadmin:boolean = false;
  issuperadmin: boolean= false;
  user:any = sessionStorage.getItem('currentUser');
  superadmin:string = "super"
  user1 = JSON.parse(this.user);
  role!: Array<string>;

  ngOnInit() {
    if (this.user1 != null){
      this.role = this.user1.roles;
      if (this.role.includes(this.superadmin)){
      this.issuperadmin = true;
      }else{
        this.issuperadmin = false;
      }
      // console.log("user ",this.user1);
      // console.log("roles", this.role);
      // console.log(this.issuperadmin);
    }
    else {
      console.log("role is empty")

    }

  }

  logout(event:any){
    this.authServices.logout(event);
    }
}
