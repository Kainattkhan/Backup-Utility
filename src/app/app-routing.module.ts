import { Component, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { combineLatest } from 'rxjs';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import {TakebackupComponent} from './takebackup/takebackup.component';
import { ViewbackupComponent } from './viewbackup/viewbackup.component';
import { RestorebackupComponent } from './restorebackup/restorebackup.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'takebackup', component:TakebackupComponent},
  {path:'viewbackup', component:ViewbackupComponent},
  {path:'restorebackup', component:RestorebackupComponent},

  {path:'home', component:HomeComponent, canActivate: [AuthGuard] ,data: { role: 'admin' } },
  {path:'user',component:UserComponent,canActivate: [AuthGuard] ,data: { role: 'user' }},
  { path: '', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    
  ],
 
  exports: [RouterModule]
})
export class AppRoutingModule { }
