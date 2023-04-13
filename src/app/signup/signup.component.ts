import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../auth-service.service';
import { passwordMatchValidator } from './matcPassword';

@Component({
  selector: 'app-signup',
  templateUrl:'./signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthServiceService,
    private toaster: ToastrService
  )
  {}

  signup_Form = new FormGroup({
    userId: new FormControl('', [Validators.required, Validators.minLength(2)]),
    Password: new FormControl('',[Validators.required, Validators.minLength(5)]),
    confirmPassword: new FormControl(null),
   
  },{
      validators:passwordMatchValidator
  });

  // passwordMatchValidator(){
  //   return (form: AbstractControl)=>{
  //    return form.get('Password')?.value === form.get('confirmPassword')?.value ? null : {notmatched: true}
  //   }
  
  

  signup() {
    this.http
      .post<any>('http://localhost:3000/signup', this.signup_Form.value)
      .subscribe(
        (Response) => {
         ;
          console.log(Response)
          this.toaster.success('Signup successfully');
        

          this.signup_Form.reset();
          this.router.navigate(['/login']);
        },
        (error) => {
          this.toaster.warning('Please enter valid data');
         
        }
      );
  }
  get userId() {
    return this.signup_Form.get('userId');
  }

  get password() {
    return this.signup_Form.get('password');
  }

  get confirmPassword() {
    return this.signup_Form.get('confirmPassword');
  }
}
