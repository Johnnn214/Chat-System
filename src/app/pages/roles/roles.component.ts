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
  
}
