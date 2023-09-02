import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Group } from '../models/group';

@Component({
  selector: 'app-grouplist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.css']
})
export class GrouplistComponent {
  newgroup:Group = new Group();
  newgrouplist:Array<Group> = []; 





}
