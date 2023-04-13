import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  login_form = new FormGroup({
    userId: new FormControl('',[Validators.required, Validators.minLength(5)]),
    Password: new FormControl('',Validators.required),
  });
  
  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {}
 
  login() {
    console.log(this.login_form.value);
    this.http.get<any>('http://localhost:3000/signup').subscribe(
      (Response) => {
        const user = Response.find((a: any) => {
          return (
            a.userId === this.login_form.value.userId &&
            a.confirmPassword === this.login_form.value.Password
          ); 
        });
        if (user) {
          this.authService.login(user.Role);
          const userRole = this.authService.getUserRole();

          if (userRole === 'admin') {
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/user']);
          }
         this.toastr.success('login successfully')
        } else {
          this.toastr.error('Invalid username or password');
        }
    },
    (error: any) => {
      alert('something went wrong');
    }
  );
}
get userId() {
  return this.login_form.get('userId');
}
get Password() {
  return this.login_form.get('Password');
}

}





      
