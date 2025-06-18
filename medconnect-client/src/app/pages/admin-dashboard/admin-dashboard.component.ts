import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  doctors: any[] = [];
  patients: any[] = [];
  appointments: any[] = [];

  // Pagination state
  doctorsCurrentPage: number = 1;
  doctorsPageSize: number = 5;
  patientsCurrentPage: number = 1;
  patientsPageSize: number = 5;
  appointmentsCurrentPage: number = 1;
  appointmentsPageSize: number = 5;

  // Filter state
  doctorFilter: string = '';
  patientFilter: string = '';
  appointmentFilter: string = '';

  doctor = {
    name: '',
    email: '',
    phone: '',
    password: '',
    specialization: '',
    role: 'doctor'
  };

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadAppointments();
  }

  loadUsers(): void {
    this.http.get<any>('http://localhost/medconnect/api/users/list-all.php').subscribe({
      next: res => {
        const allUsers = res.users || [];
        this.doctors = allUsers.filter((u: any) => u.role === 'doctor');
        this.patients = allUsers.filter((u: any) => u.role === 'patient');
      },
      error: () => alert('Failed to load users.')
    });
  }

  loadAppointments(): void {
    this.http.get<any>('http://localhost/medconnect/api/appointments/list-all.php').subscribe({
      next: res => this.appointments = res.appointments || [],
      error: () => alert('Failed to load appointments.')
    });
  }

  // Filtering helpers
  get filteredDoctors(): any[] {
    const filter = this.doctorFilter.toLowerCase();
    return this.doctors.filter(d =>
      d.name.toLowerCase().includes(filter) ||
      d.email.toLowerCase().includes(filter) ||
      (d.specialization && d.specialization.toLowerCase().includes(filter))
    );
  }

  get filteredPatients(): any[] {
    const filter = this.patientFilter.toLowerCase();
    return this.patients.filter(p =>
      p.name.toLowerCase().includes(filter) ||
      p.email.toLowerCase().includes(filter)
    );
  }

  get filteredAppointments(): any[] {
    const filter = this.appointmentFilter.toLowerCase();
    return this.appointments.filter(a =>
      a.patient_id.toString().includes(filter) ||
      a.doctor_id.toString().includes(filter) ||
      a.status.toLowerCase().includes(filter)
    );
  }

  // Pagination helpers with filtering
  get pagedDoctors(): any[] {
    const start = (this.doctorsCurrentPage - 1) * this.doctorsPageSize;
    return this.filteredDoctors.slice(start, start + this.doctorsPageSize);
  }

  get pagedPatients(): any[] {
    const start = (this.patientsCurrentPage - 1) * this.patientsPageSize;
    return this.filteredPatients.slice(start, start + this.patientsPageSize);
  }

  get pagedAppointments(): any[] {
    const start = (this.appointmentsCurrentPage - 1) * this.appointmentsPageSize;
    return this.filteredAppointments.slice(start, start + this.appointmentsPageSize);
  }

  // Pagination controls with filtering
  doctorsTotalPages(): number {
    return Math.ceil(this.filteredDoctors.length / this.doctorsPageSize);
  }

  patientsTotalPages(): number {
    return Math.ceil(this.filteredPatients.length / this.patientsPageSize);
  }

  appointmentsTotalPages(): number {
    return Math.ceil(this.filteredAppointments.length / this.appointmentsPageSize);
  }

  setDoctorsPage(page: number): void {
    if (page >= 1 && page <= this.doctorsTotalPages()) {
      this.doctorsCurrentPage = page;
    }
  }

  setPatientsPage(page: number): void {
    if (page >= 1 && page <= this.patientsTotalPages()) {
      this.patientsCurrentPage = page;
    }
  }

  setAppointmentsPage(page: number): void {
    if (page >= 1 && page <= this.appointmentsTotalPages()) {
      this.appointmentsCurrentPage = page;
    }
  }

  updateStatus(app: any): void {
    this.http.post('http://localhost/medconnect/api/appointments/update-status.php', {
      appointment_id: app.id,
      status: app.status
    }).subscribe({
      next: (res: any) => alert(res.message),
      error: () => alert('Failed to update status.')
    });
  }

  registerDoctor(): void {
    if (!this.doctor.name || !this.doctor.email || !this.doctor.password || !this.doctor.phone || !this.doctor.specialization) {
      alert('Please fill in all doctor fields.');
      return;
    }

    this.http.post<any>('http://localhost/medconnect/api/auth/register.php', this.doctor).subscribe({
      next: res => {
        alert(res.message);
        this.doctor = { name: '', email: '', phone: '', password: '', specialization: '', role: 'doctor' };
        this.loadUsers();
      },
      error: () => alert('Doctor registration failed.')
    });
  }

  deleteUser(userId: number): void {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.http.post('http://localhost/medconnect/api/users/delete.php', { id: userId }).subscribe({
      next: (res: any) => {
        alert(res.message);
        this.loadUsers();
      },
      error: () => alert('Failed to delete user.')
    });
  }
}
