import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ImageuploadService } from 'src/app/services/imageupload.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private toastr = inject(ToastrService);
  private imgService = inject(ImageuploadService);
  private authService = inject(AuthService);
  private userService = inject(UsersService);
  selectedfile:any = null;
  imagepath:String ="";
  currentuser:User = new User();
  loggedin$!: Observable<boolean>;

  ngOnInit(){
    this.currentuser = JSON.parse(this.authService.getCurrentuser() || '{}');
    console.log(this.currentuser);

    this.loggedin$ = this.authService.isLoggedin();
    console.log("is login ", this.authService.isLoggedin());
  }

  onFileSelected(event:any){
    this.selectedfile = event.target.files[0];
  }

  onUpload() {
    if (this.selectedfile) { // Check if a file is selected
      const fd = new FormData();
      fd.append('image', this.selectedfile, this.selectedfile.name);
      this.imgService.imgupload(fd).subscribe({
        next: (res) => {  
          this.imagepath = res.data.filename;
          this.currentuser.avatar  = res.data.filename; 
          this.authService.updateUser(this.currentuser).subscribe({
            next: (data) => { 
              console.log(data);
              this.toastr.success('User Update', 'User data was updated.');
            }
          });
          this.authService.setCurrentuser(this.currentuser);
        }
      });
    } else {
      // Handle the case where no file is selected
      this.toastr.error('No File Selected', 'Please select an image to upload.');
    }
  }



  deleteAcount(){
    this.userService.removeUser(this.currentuser.id).subscribe(() => {
    this.authService.logout();
    }); 
  }
 
}
