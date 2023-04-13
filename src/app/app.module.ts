import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
// import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// import { ToastrModule } from 'ngx-toastr';

import { NavBarComponent } from './nav-bar/nav-bar.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
// import { PopupComponent } from './filteration/popup/popup.component';
// import { PopupComponent } from './filteration/popup/popup.component';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { TakebackupComponent } from './takebackup/takebackup.component';
import { ViewbackupComponent } from './viewbackup/viewbackup.component';
import { RestorebackupComponent } from './restorebackup/restorebackup.component';
// import {MAT_DIALOG_DATA} from '@angular/material/dialog';


// import { AnimationDriver } from '@angular/animations/browser';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    UserComponent,
    TakebackupComponent,
    ViewbackupComponent,
    RestorebackupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,

    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    CommonModule,
    // MatListModule,
     MatTableModule,
    NgbModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
