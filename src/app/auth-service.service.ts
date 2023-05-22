import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private isAuthenticated = false;

  constructor(private router:Router, private http: HttpClient) {}

  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  showRadios: boolean = false;

  toggleRadios() {
    this.showRadios = !this.showRadios;
  }
 
  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}