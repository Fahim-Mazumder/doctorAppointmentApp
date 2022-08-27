import { AppointmentStorageService } from './../service/appointment-storage.service';
import { CreateDoctorAppointmentComponent } from './../create-doctor-appointment/create-doctor-appointment.component';
import { ViewDoctorAppointmentComponent } from './../view-doctor-appointment/view-doctor-appointment.component';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from '../model/Appointment';
import { Day } from '../model/Day';
import { Month } from '../model/Month';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-doctor-schedule-calendar',
  templateUrl: './doctor-schedule-calendar.component.html',
  styleUrls: ['./doctor-schedule-calendar.component.scss']
})

export class DoctorScheduleCalendarComponent implements OnInit {
  currentYear = 0;
  currentMonth = 0;
  currentDate = 0;

  months: Month[] = [];
  days: Day[] = [];

  dayNameList: string[] = [];
  dayNames = new Map<number, string>([
    [0, "Thu"],
    [1, "Fri"],
    [2, "Sat"],
    [3, "Sun"],
    [4, "Mon"],
    [5, "Tue"],
    [6, "Wed"],
  ]);

  currentAppointment = new Appointment();

  constructor(private route: ActivatedRoute,
     private dialog: MatDialog,
     private appointmentStorageService: AppointmentStorageService,
     private activatedRoute: ActivatedRoute
     ) { }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.currentMonth = new Date().getMonth() + 1;
    this.currentDate = new Date().getDate();

    this.months = new Month(0, '').getAllMonths(this.currentYear, this.currentDate);
    this.populateDays();
    this.activatedRoute.params.subscribe(month => {
      this.monthChangedRoute(parseInt(month.monthNo));
    })
  }

  populateDays() {
    this.days = [];
    this.dayNameList = [];
    let d = new Date(this.currentYear, this.currentMonth, 0);
    let nDays = d.getDate();

    let daycounter = 1;
    for (daycounter = 1; daycounter <= nDays; daycounter++) {
      if (daycounter < 8) {

        let val = this.dayNames.get(new Date(this.currentYear, this.currentMonth, daycounter).getDay())?.toString();
        if (val) {
          this.dayNameList.push(val);
        }
      }
      let day = new Day(daycounter, this.getAppointments(daycounter));
      this.days.push(day);
    }
  }

  getAppointments(day: number): Appointment[] {
    let selectedAppointments: Appointment[] = [];
    let allAppointments = this.appointmentStorageService.get('appointments');

    allAppointments.forEach(apm => {
      let appday = new Date(apm.date).getDate();
      let appmonth = new Date(apm.date).getMonth() + 1;

      if (day === appday && this.currentMonth === appmonth) {
        selectedAppointments.push(apm);
      }
    });
    return selectedAppointments;
  }

  monthChangedRoute(param: any) {
    this.currentMonth = param;
    this.DateGenerate();
  }

  monthChanged(param: any) {
    this.currentMonth = param.value;
    this.DateGenerate();
  }

  DateGenerate() {
    let numberofdays = new Date(this.currentYear, this.currentMonth, 0).getDate();
    let diff = this.days.length - numberofdays;

    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        this.days.pop();
      }
    }
    else {
      let lowerc = this.days[this.days.length - 1].dayNo;
      for (let i = 0; i < (diff * -1); i++) {
        this.days.push(new Day(++lowerc, []));
      }
    }
    this.arrangeAppointments();
  }

  arrangeAppointments() {
    this.days.forEach(day => {
      day.appointments = this.getAppointments(day.dayNo);
    });
  }

  appointmentDialog() {
    const dialogRef = this.dialog.open(CreateDoctorAppointmentComponent, {
      width: '500px',
      data: this.currentAppointment
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('result : ', result);
      if (!result) {
        return;
      }
      this.currentAppointment = result;
      if (this.currentAppointment.firstName != '' && this.currentAppointment.lastName != '') {
        this.appointmentStorageService.add(this.currentAppointment, 'appointments');
        alert('Appointment created successfully');
        this.addAppointmentOnCurrentPage(this.currentAppointment);
      }
    });
  }

  addAppointmentOnCurrentPage(apmnt: Appointment) {
    if ((new Date(apmnt.date).getMonth() + 1) === this.currentMonth) {
      for (let i = 0; i < this.days.length; i++) {
        if (this.days[i].dayNo === new Date(apmnt.date).getDate()) {
          this.days[i].appointments.push(apmnt);
          this.days[i].appointments.sort((a, b) => a.timeint - b.timeint);
          break;
        }
      }
    }
  }

  gotoDetail(apmnt: Appointment) {
    const dialogRef = this.dialog.open(ViewDoctorAppointmentComponent, {
      width: '400px',
      data: apmnt
    });
  }
}
