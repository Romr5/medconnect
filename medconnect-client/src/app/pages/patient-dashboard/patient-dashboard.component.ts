import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-dashboard.component.html'
})
export class PatientDashboardComponent implements OnInit {
  appointments: any[] = [];
  patient: any;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.patient = JSON.parse(localStorage.getItem('user')!);
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments(this.patient.id).subscribe({
      next: (res: any) => this.appointments = res,
      error: () => alert('Failed to load appointments')
    });
  }

  logout(): void {
    localStorage.clear();
    location.href = '/login';
  }
}
