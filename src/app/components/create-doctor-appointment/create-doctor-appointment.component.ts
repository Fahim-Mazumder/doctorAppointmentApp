import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appointment } from 'src/app/model/Appointment';

@Component({
  selector: 'app-create-doctor-appointment',
  templateUrl: './create-doctor-appointment.component.html',
  styleUrls: ['./create-doctor-appointment.component.scss']
})
export class CreateDoctorAppointmentComponent implements OnInit {
  apmntForm!: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateDoctorAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Appointment, public fBuilder: FormBuilder
    ) {
    this.apmntForm = this.fBuilder.group({
      firstName: ['', [
        Validators.required,
        Validators.maxLength(40)
      ]]
      , lastName: ['', [
        Validators.required,
        Validators.maxLength(40)
      ]]
      , email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]]
      , gender: ['']
      , age: ['']
      , date: ['', [
        Validators.required,
      ]]
      , time: ['', [
        Validators.required
      ]]
    });
  }

  ngOnInit(): void {
    this.data = new Appointment();
    this.apmntForm.valueChanges.subscribe(
      val => {
        this.data.firstName = val.firstName;
        this.data.lastName = val.lastName;
        this.data.email = val.email;
        this.data.gender = val.gender;
        this.data.age = val.age;
        this.data.date = val.date;
        this.data.time = val.time;
        if (this.data.time) {
          this.data.timeint = this.data.getTimeInt();
        }
      });
  }

  save(): void {
    this.dialogRef.close(this.data);
  }

  onClose():void{
    this.dialogRef.close();
  }

  get firstName() {
    return this.apmntForm.get('firstName');
  }

  get lastName() {
    return this.apmntForm.get('lastName');
  }

  get email() {
    return this.apmntForm.get('email');
  }

  get gender() {
    return this.apmntForm.get('gender');
  }

  get age() {
    return this.apmntForm.get('age');
  }

  get date() {
    return this.apmntForm.get('date');
  }

  get time() {
    return this.apmntForm.get('time');
  }

  // Only Integer Numbers
  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
}
