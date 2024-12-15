import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-availablegroup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './availablegroup.component.html',
  styleUrls: ['./availablegroup.component.css']
})
export class AvailablegroupComponent {

  otherGroups: any[] = [];
  currentUser!: any;
  
  constructor(private groupsservice: GroupsService,
    private authService: AuthService) { }
  ngOnInit(){
    this.currentUser = this.authService.getCurrentuser();
    this.currentUser = JSON.parse(this.currentUser);
    console.log("current User",this.currentUser);
    this.loadOtherGroups();
  }

  // loading the available groups 
  loadOtherGroups() {
    this.groupsservice.getOtherGroups(this.currentUser.id).subscribe(groups => {
      this.otherGroups = groups;
    });
  }
  // not implemented
  apply(event:any){
  }
}
