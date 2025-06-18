import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  user = { op_number: '' };

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.onLogin();
  }

  onLogin(): void {
    if (!this.user.op_number) {
      alert('Please enter your OP Number');
      return;
    }

    this.auth.login(this.user).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          localStorage.setItem('user', JSON.stringify(res.user));

          alert('Login successful');

          const role = res.user.role;
          this.router.navigate(['']);
          // if (role === 'patient') this.router.navigate(['/patient']);
          // else if (role === 'doctor') this.router.navigate(['/doctor']);
          // else if (role === 'admin') this.router.navigate(['/admin']);
        } else {
          alert(res.message || 'Invalid OP Number');
        }
      },
      error: (err: any) => {
        console.error(err);
        alert('Login failed. Try again.');
      }
    });
  }
}
