import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public authService:AuthServiceService) { }

  ngOnInit(): void {
  }
  // isUser(): boolean {
  //   return this.authService.getUserRole() === 'user';
  // }

  // isAdmin(): boolean {
  //   return this.authService.getUserRole() === 'admin';
  // }
  // isAuthenticatedUser(): boolean {
  //   return this.authService.isAuthenticatedUser();
  // }

}
