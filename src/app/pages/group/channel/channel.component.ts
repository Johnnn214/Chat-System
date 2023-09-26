import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Channel } from '../../../models/channel';
import { GroupsService } from '../../../services/groups.service';
import { Group } from '../../../models/group';
@Component({
  selector: 'app-channel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent {

  group: Array<any> = ["a", "b"];

}
