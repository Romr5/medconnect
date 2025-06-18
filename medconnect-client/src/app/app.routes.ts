import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { PatientDashboardComponent } from './pages/patient-dashboard/patient-dashboard.component';
import { DoctorDashboardComponent } from './pages/doctor-dashboard/doctor-dashboard.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment.component';
import { AppointmentHistoryComponent } from './pages/appointment-history/appointment-history.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { WritePrescriptionComponent } from './pages/write-prescription/write-prescription.component';
import { MyPrescriptionsComponent } from './pages/my-prescriptions/my-prescriptions.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginStaffComponent } from './pages/login-staff/login-staff.component';
import { RegisterDoctorComponent } from './pages/register-doctor/register-doctor.component';
import { LoginChoiceComponent } from './pages/login-choice/login-choice.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'patient', component: PatientDashboardComponent, canActivate: [AuthGuard], data: { role: 'patient' } },
  { path: 'doctor', component: DoctorDashboardComponent, canActivate:[AuthGuard], data: { role: 'doctor' } },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'book-appointment', component: BookAppointmentComponent },
  {path: 'my-appointments', component: AppointmentHistoryComponent },
  { path: 'write-prescription', component: WritePrescriptionComponent, canActivate: [AuthGuard], data: { role: 'doctor' } },
  { path: 'my-prescriptions', component: MyPrescriptionsComponent, canActivate: [AuthGuard], data: { role: 'patient' } },
  { path: '', component: HomeComponent },
  { path: 'login-staff', component: LoginStaffComponent },
  { path: 'register-doctor', component: RegisterDoctorComponent, canActivate: [AuthGuard], data: { role: 'admin' } },
  { path: 'login-choice', component: LoginChoiceComponent },
  { path: '**', redirectTo: '' }
];
