import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserlistComponent } from 'src/app/users/userlist/userlist.component';
import { GrouplistComponent } from "../../grouplist/grouplist.component";
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-group',
    standalone: true,
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css'],
    imports: [CommonModule, UserlistComponent, GrouplistComponent]
})
export class GroupComponent {

  isadmin:boolean = false;
  user:any = sessionStorage.getItem('currentUser');
  admin:string = "group"
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

  adduser(event:any){

  }
  edit(event:any){

  }
  cancel(event:any){

  }
  remove(event:any){

  }
  addchannel(event:any){

  }

  removechannel(event:any){

  }
  submit(event: any){

  }


}
