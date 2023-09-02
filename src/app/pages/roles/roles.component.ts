import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserlistComponent } from 'src/app/users/userlist/userlist.component';
import { GroupadminlistComponent } from 'src/app/users/groupadminlist/groupadminlist.component';
import { SuperlistComponent } from 'src/app/users/superlist/superlist.component';


@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, UserlistComponent,GroupadminlistComponent,SuperlistComponent],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  
  isadmin:boolean = false;
  user:any | null = sessionStorage.getItem('currentUser');
  admin:string = "super"
  user1 = JSON.parse(this.user);
  role:Array<string> | null | undefined;

  
  ngOnInit() {
    if (this.role == null){
      console.log("role is empty")
    }
    else {
      this.role == this.user1.roles;
      if (this.role?.includes(this.admin)){
      this.isadmin = true;
      }else{
        this.isadmin = false;
      }
    }
    console.log(this.isadmin);
    console.log(this.role);
  }


}
