import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
    
  constructor(private authServices: AuthService) { }

  loggedin$!: Observable<boolean>;

  ngOnInit() {
    this.loggedin$ = this.authServices.isLoggedin();
    console.log("is login ", this.authServices.isLoggedin());
  }
  

  logout(){
    this.authServices.logout();
    }

}
