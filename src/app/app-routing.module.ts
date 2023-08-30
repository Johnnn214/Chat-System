import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat/chat.component';
import { GroupComponent } from './group/group.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
  { path: 'chat', component: ChatComponent},
  { path: 'group',component: GroupComponent},
  { path: 'login',component: LoginComponent},
  { path: 'profile',component: ProfileComponent},
  { path: 'roles',component: RolesComponent},
  { path: 'signup',component: SignupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
