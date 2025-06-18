import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../services/appointment.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-my-prescriptions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-prescriptions.component.html'
})
export class MyPrescriptionsComponent implements OnInit {
  prescriptions: any[] = [];
  user: any;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.loadPrescriptions();
  }

  loadPrescriptions(): void {
    this.appointmentService.getPrescriptionsByPatient(this.user.id).subscribe({
      next: (res: any) => this.prescriptions = res,
      error: () => alert('Failed to load prescriptions')
    });
  }

  downloadPDF(prescription: any): void {
  const doc = new jsPDF();

  const patientId = prescription.patient_id ?? 'Unknown';
  const doctor = prescription.doctor_name ?? 'Unknown';
  const diagnosis = prescription.diagnosis ?? 'No diagnosis provided';
  const notes = prescription.prescription ?? 'No prescription provided';
  const date = prescription.created_at
    ? new Date(prescription.created_at).toLocaleString()
    : 'Unknown date';

  doc.setFontSize(14);
  doc.text('MedConnect Prescription', 20, 20);

  doc.setFontSize(11);
  doc.text(`Patient ID: ${patientId}`, 20, 30);
  doc.text(`Doctor: ${doctor}`, 20, 40);
  doc.text(`Date: ${date}`, 20, 50);

  doc.text('Diagnosis:', 20, 60);
  doc.text(doc.splitTextToSize(diagnosis, 170), 20, 70);

  const prescriptionY = 70 + (doc.splitTextToSize(diagnosis, 170).length * 10);
  doc.text('Prescription:', 20, prescriptionY);
  doc.text(doc.splitTextToSize(notes, 170), 20, prescriptionY + 10);

  doc.save(`prescription-${prescription.id}.pdf`);
}
}
