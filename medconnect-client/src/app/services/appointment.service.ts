import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost/medconnect/api/appointments';
  api: any;

  constructor(private http: HttpClient) {}

  bookAppointment(data: any) {
    return this.http.post(`${this.baseUrl}/book.php`, data);
  }

  getAppointments(patientId: number) {
    return this.http.post(`${this.baseUrl}/list-by-user.php`, { patient_id: patientId });
  }

  getAppointmentsByDoctor(doctorId: number) {
    return this.http.post(`${this.baseUrl}/list-by-doctor.php`, { doctor_id: doctorId });
  }

  addPrescription(data: any) {
    return this.http.post('http://localhost/medconnect/api/prescriptions/add.php', data);
  }

  getPrescriptionsByPatient(patientId: number) {
    return this.http.post('http://localhost/medconnect/api/prescriptions/list-by-patient.php', {
      patient_id: patientId
    });
  }

 // appointment.service.ts
updateStatus(appointmentId: number, status: string) {
  return this.http.post(`${this.api}/appointments/update-status.php`, {
    appointment_id: appointmentId,
    status
  });
}

}
