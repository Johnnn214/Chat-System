import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserlistComponent } from 'src/app/users/userlist/userlist.component';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [CommonModule, UserlistComponent],
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent {

}
