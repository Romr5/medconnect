import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './doctor-dashboard.component.html'
})
export class DoctorDashboardComponent implements OnInit {
  appointments: any[] = [];
  doctor: any;

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private http: HttpClient // ✅ Inject HttpClient here
  ) {}

  ngOnInit(): void {
    this.doctor = JSON.parse(localStorage.getItem('user')!);
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAppointmentsByDoctor(this.doctor.id).subscribe({
      next: (res: any) => {
        this.appointments = res;
      },
      error: () => {
        alert('Failed to fetch appointments');
      }
    });
  }

  updateStatus(app: any): void {
    this.http.post('http://localhost/medconnect/api/appointments/update-status.php', {
      appointment_id: app.id,
      status: app.status
    }).subscribe({
      next: (res: any) => {
        if (res.status === 'success') {
          this.loadAppointments();
          alert('Status updated');
        } else {
          alert('Update failed: ' + res.message);
        }
      },
      error: () => alert('Server error')
    });
  }

  writePrescription(appointment: any): void {
    localStorage.setItem('selectedAppointment', JSON.stringify(appointment));
    this.router.navigate(['/write-prescription']);
  }
}
