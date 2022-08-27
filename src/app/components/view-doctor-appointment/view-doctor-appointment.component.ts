import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from 'src/app/model/Appointment';

@Component({
  selector: 'app-view-doctor-appointment',
  templateUrl: './view-doctor-appointment.component.html',
  styleUrls: ['./view-doctor-appointment.component.scss']
})
export class ViewDoctorAppointmentComponent implements OnInit {
  currentAppointment: Appointment = new Appointment;

  constructor(public dialogRef: MatDialogRef<ViewDoctorAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Appointment
    ) { }

  ngOnInit(): void {
    this.currentAppointment = this.data;
  }

  onClose():void{
    this.dialogRef.close();
  }
}
