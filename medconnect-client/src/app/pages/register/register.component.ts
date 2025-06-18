import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user = {
    name: '',
    phone: '',
    email: '',
    address: '',
    age: '',
    gender: '',
    role: 'patient',
    op_number: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit(): void {
    if (!this.user.op_number) {
      alert("Please enter your OP number");
      return;
    }

    this.auth.register(this.user).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          alert(`Registered successfully with OP Number: ${this.user.op_number}`);
          this.router.navigate(['/login']);
        } else {
          alert(res.message || 'Registration failed');
        }
      },
      error: () => alert('Something went wrong!')
    });
  }
}
