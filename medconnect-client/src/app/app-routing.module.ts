import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PatientDashboardComponent } from './pages/patient-dashboard/patient-dashboard.component';
import { DoctorDashboardComponent } from './pages/doctor-dashboard/doctor-dashboard.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment.component';
import { AppointmentHistoryComponent } from './pages/appointment-history/appointment-history.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'patient', component: PatientDashboardComponent },
  { path: 'doctor', component: DoctorDashboardComponent },
  { path: 'admin', component: PatientDashboardComponent },
  { path: 'book-appointment', component: BookAppointmentComponent },
  {path: 'my-appointments', component: AppointmentHistoryComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
