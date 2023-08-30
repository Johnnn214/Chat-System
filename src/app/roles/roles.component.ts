import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Userlist } from 'src/models/userlist';
import { UserlistComponent } from '../userlist/userlist.component';


@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, UserlistComponent],
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent {
  


}
