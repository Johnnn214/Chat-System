import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './pages/chat/chat.component';
import { GroupComponent } from './pages/group/group.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: '',component: LoginComponent},
  { path: 'chat', component: ChatComponent, canActivate: [authGuard]},
  { path: 'group',component: GroupComponent, canActivate: [authGuard]},
  { path: 'profile',component: ProfileComponent, canActivate: [authGuard]},
  { path: 'signup',component: SignupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
