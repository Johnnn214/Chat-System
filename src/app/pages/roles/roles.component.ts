import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserlistComponent } from 'src/app/users/userlist/userlist.component';
import { GrouplistComponent } from 'src/app/users/grouplist/grouplist.component';
import { SuperlistComponent } from 'src/app/users/superlist/superlist.component';


@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, UserlistComponent,GrouplistComponent,SuperlistComponent],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  


}
