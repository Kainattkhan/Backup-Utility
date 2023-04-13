import { Injectable } from '@angular/core';
import { ɵangular_packages_platform_browser_platform_browser_n } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  private isAuthenticated = false;
 public userRole: string | null = null;

  constructor(private router:Router, private http: HttpClient) {}

  login(Role:string) {
    if (Role === 'admin') {
      this.userRole = 'admin';
    } else {
      this.userRole = 'user';
    }
    this.isAuthenticated = true;
  }

  logout() {
    this.isAuthenticated = false;
    this.userRole = null;
    this.router.navigate(['/login']);
  }

  showRadios: boolean = false;

  toggleRadios() {
    this.showRadios = !this.showRadios;
  }
  getData() {
    // Replace the URL with the actual endpoint to fetch the data
    return this.http.get('http://example.com/data');
  }
  // getRadioData(id: number) {
  //   return this.http.get(`https://example.com/api/radio/${id}`);
  // }
  // onRadioChange(event: any) {
  //   const database = event.target.value;

  //   this.http.get(`http://backend-url.com/data?database=${database}`).subscribe((response: any) => {
  //     this.data = response.data;
  //   });

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  getUserRole(): string | null {
    return this.userRole;
  }
  isAuthenticatedUser(): boolean {
    return this.isAuthenticated && this.userRole === 'user';
  }
}