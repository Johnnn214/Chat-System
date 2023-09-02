import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { GroupComponent } from './pages/group/group.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RolesComponent } from './pages/roles/roles.component';
import { SignupComponent } from './pages/signup/signup.component';

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
