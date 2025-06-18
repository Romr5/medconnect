import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './book-appointment.component.html'
})
export class BookAppointmentComponent implements OnInit {
  user: any;
  doctors: any[] = [];

  appointment = {
    patient_id: 0,
    doctor_id: 0,
    appointment_date: '',
    appointment_time: ''
  };

  constructor(
    private appointmentService: AppointmentService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Get logged-in user
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    this.appointment.patient_id = this.user?.id || 0;

    // Load available doctors
    this.http.get<any>('http://localhost/medconnect/api/users/list-doctors.php')
      .subscribe({
        next: res => {
          if (res.status === 'success') this.doctors = res.doctors;
        },
        error: err => console.error('Failed to load doctors', err)
      });
  }

  book(): void {
    if (!this.appointment.doctor_id || !this.appointment.appointment_date || !this.appointment.appointment_time) {
      alert('Please fill all required fields.');
      return;
    }

    this.appointmentService.bookAppointment(this.appointment).subscribe({
      next: (res: any) => alert(res.message),
      error: (err: any) => alert('Booking failed')
    });
  }
}
