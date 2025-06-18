import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost/medconnect/api/auth';

  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register.php`, data);
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/login.php`, data);
  }
  logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  }
}
