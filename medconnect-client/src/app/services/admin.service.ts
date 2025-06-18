import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost/medconnect/api/admin';

  constructor(private http: HttpClient) {}

  // ✅ Get all users
  getUsers() {
    return this.http.get(`${this.baseUrl}/get-users.php`);
  }

  // ✅ Update user role
  updateUserRole(userId: number, role: string) {
    return this.http.post(`${this.baseUrl}/update-role.php`, {
      user_id: userId,
      role: role
    });
  }

  // ✅ (Optional) Delete user
  deleteUser(userId: number) {
    return this.http.post(`${this.baseUrl}/delete-user.php`, {
      user_id: userId
    });
  }
}
