import { Injectable } from '@angular/core';
import { Appointment } from '../model/Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentStorageService {

  constructor() { }

  add(value: Appointment, keyname: String) {
    let appointments: Appointment[] = [];
    let val = localStorage.getItem(keyname.toString());
    if (val !== null) {
      appointments = JSON.parse(val);
      appointments = [value, ...appointments]
    }
    else {
      appointments = [value];
    }
    localStorage.setItem(keyname.toString(), JSON.stringify(appointments));
  }

  get(keyname: String): Appointment[] {
    let appointments: Appointment[] = [];
    let val = localStorage.getItem(keyname.toString());

    if (val !== null) {
      appointments = JSON.parse(val);
    }

    return appointments.sort((a, b) => a.timeint - b.timeint);
  }
}
