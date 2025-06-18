import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login-staff',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login-staff.component.html'
})
export class LoginStaffComponent {
  user = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    this.auth.login(this.user).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          localStorage.setItem('user', JSON.stringify(res.user));
          const role = res.user.role;

          this.router.navigate(['']);
          // if (role === 'admin') this.router.navigate(['/admin']);
          // else if (role === 'doctor') this.router.navigate(['/doctor']);
          // else alert('Not allowed for this role');
        } else {
          alert(res.message || 'Login failed');
        }
      },
      error: () => alert('Login failed')
    });
  }
}
