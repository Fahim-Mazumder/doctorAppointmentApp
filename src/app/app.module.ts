import { Time24to12Format } from './model/time24to12.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CreateDoctorAppointmentComponent } from './components/create-doctor-appointment/create-doctor-appointment.component';
import { DoctorScheduleCalendarComponent } from './components/doctor-schedule-calendar/doctor-schedule-calendar.component';
import { ViewDoctorAppointmentComponent } from './components/view-doctor-appointment/view-doctor-appointment.component';

@NgModule({
  declarations: [
    AppComponent,
      DoctorScheduleCalendarComponent,
      CreateDoctorAppointmentComponent,
      ViewDoctorAppointmentComponent,
      Time24to12Format
   ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
