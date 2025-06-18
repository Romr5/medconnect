import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-write-prescription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './write-prescription.component.html'
})
export class WritePrescriptionComponent implements OnInit {
prescription = {
  appointment_id: 0,
  doctor_id: 0,
  patient_id: 0,
  diagnosis: '',
  prescription: ''
};

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    const doctor = JSON.parse(localStorage.getItem('user')!);
    const selected = JSON.parse(localStorage.getItem('selectedAppointment') || '{}');

    this.prescription.doctor_id = doctor.id;
    this.prescription.appointment_id = selected.id || 0;
    this.prescription.patient_id = selected.patient_id || 0;
  }

 submit(): void {
  this.appointmentService.addPrescription(this.prescription).subscribe({
    next: (res: any) => {
      console.log(res); // ✅ log the API response
      if (res.status === 'success') {
        alert(res.message);
        localStorage.removeItem('selectedAppointment');
      } else {
        alert(res.message + '\n' + (res.error || ''));
      }
    },
    error: (err) => {
      console.error(err);
      alert('Failed to save prescription');
    }
  });
}
}
