import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from './auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GroupadminComponent } from './groupadmin/groupadmin.component';
import { GroupsuperComponent } from './groupsuper/groupsuper.component';
import { GroupusersComponent } from './groupusers/groupusers.component';


const routes: Routes = [
  { path: '',component: LoginComponent},
  { path: 'chat', component: ChatComponent, canActivate: [authGuard]},
  { path: 'groupusers',component: GroupusersComponent, canActivate: [authGuard]},
  { path: 'groupadmin',component: GroupadminComponent, canActivate: [authGuard]},
  { path: 'groupsuper',component: GroupsuperComponent, canActivate: [authGuard]},
  { path: 'profile',component: ProfileComponent, canActivate: [authGuard]},
  { path: 'chat/:channelId',component: ChatComponent,canActivate: [authGuard]},
  { path: 'signup',component: SignupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    ToastrModule.forRoot(), BrowserAnimationsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
