import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserlistComponent } from 'src/app/userlist/userlist.component';
import { GroupadminlistComponent } from 'src/app/groupadminlist/groupadminlist.component';
import { SuperlistComponent } from 'src/app/superlist/superlist.component';


@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, UserlistComponent,GroupadminlistComponent,SuperlistComponent],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  
}
