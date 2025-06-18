import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appointment-history',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './appointment-history.component.html'
})
export class AppointmentHistoryComponent implements OnInit {
  user: any;
  appointments: any[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    this.appointmentService.getAppointments(this.user.id).subscribe({
      next: (res: any) => {
        this.appointments = res;
      },
      error: (err: any) => {
        console.error(err);
        alert('Failed to load appointments');
      }
    });
  }
}
