import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-doctor',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './register-doctor.component.html'
})
export class RegisterDoctorComponent {
  doctor = {
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    age: '',
    gender: '',
    role: 'doctor',
    op_number: '',
    specialization: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    this.auth.register(this.doctor).subscribe({
      next: (res: any) => {
        alert(res.message);
        if (res.status === 'success') {
          this.router.navigate(['/admin']);
        }
      },
      error: (err) => alert('Registration failed')
    });
  }
}
